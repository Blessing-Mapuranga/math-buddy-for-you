import { useEffect, useRef, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2, User, Bot } from "lucide-react";
import { toast } from "sonner";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

type Msg = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

function renderMath(text: string) {
  // Split by $$...$$ blocks first, then $...$ inline.
  const blocks = text.split(/(\$\$[\s\S]+?\$\$)/g);
  return blocks.map((block, i) => {
    if (block.startsWith("$$") && block.endsWith("$$")) {
      const math = block.slice(2, -2).trim();
      try {
        return <BlockMath key={i} math={math} />;
      } catch {
        return <code key={i}>{block}</code>;
      }
    }
    const parts = block.split(/(\$[^$\n]+?\$)/g);
    return (
      <span key={i}>
        {parts.map((p, j) => {
          if (p.startsWith("$") && p.endsWith("$") && p.length > 2) {
            const math = p.slice(1, -1);
            try {
              return <InlineMath key={j} math={math} />;
            } catch {
              return <code key={j}>{p}</code>;
            }
          }
          return <span key={j}>{p}</span>;
        })}
      </span>
    );
  });
}

const Ask = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    taRef.current?.focus();
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    // optimistic empty assistant message we'll stream into
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/ask-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
          apikey: PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `Error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              acc += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            // ignore partial json
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
      setMessages((m) => m.slice(0, -1)); // remove empty assistant
    } finally {
      setLoading(false);
      setTimeout(() => taRef.current?.focus(), 50);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    "Solve dy/dx + 2y = e^{-x}, y(0)=1",
    "Find the Laplace transform of t^2 e^{-3t}",
    "Solve the Euler-Cauchy equation x^2 y'' - 3x y' + 4y = 0",
    "Expand f(x)=x in Fourier series on [-π, π]",
  ];

  return (
    <AppLayout title="Ask Math Buddy AI">
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Ask Math Buddy</h2>
                <p className="text-muted-foreground mb-8">
                  Stuck on an ODE, Laplace transform, or Fourier series? Type your question — I'll show every step.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-left">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="p-3 rounded-lg border border-border bg-card hover:bg-accent/5 hover:border-accent/40 transition text-sm text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap break-words leading-relaxed">
                    {m.content ? renderMath(m.content) : (
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-card p-3 lg:p-4">
          <div className="max-w-3xl mx-auto flex gap-2 items-end">
            <Textarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask any MTH166 question…"
              rows={1}
              className="resize-none min-h-[44px] max-h-40"
              disabled={loading}
            />
            <Button onClick={send} disabled={loading || !input.trim()} size="icon" aria-label="Send">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2 max-w-3xl mx-auto">
            AI can make mistakes — always verify critical results.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Ask;