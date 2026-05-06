import { useState, useMemo } from "react";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";

const SearchPage = () => {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const out: { unitId: string; unitTitle: string; unitNumber: string; match: string }[] = [];
    for (const u of units) {
      if (u.title.toLowerCase().includes(query) || u.description.toLowerCase().includes(query)) {
        out.push({ unitId: u.id, unitTitle: u.title, unitNumber: u.number, match: u.description });
      }
      for (const c of u.chapters) {
        if (c.toLowerCase().includes(query)) {
          out.push({ unitId: u.id, unitTitle: u.title, unitNumber: u.number, match: c });
        }
      }
    }
    return out;
  }, [q]);

  return (
    <AppLayout title="Search">
      <div className="p-6 lg:p-10 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Search Topics</h2>
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search units, chapters or topics..."
            className="w-full pl-11 pr-4 py-3 rounded-lg bg-card border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground"
          />
        </div>

        {q && results.length === 0 && (
          <p className="text-muted-foreground">No results for "{q}".</p>
        )}

        <div className="space-y-2">
          {results.map((r, i) => (
            <Link
              key={i}
              to={`/unit/${r.unitId}`}
              className="block p-4 bg-card rounded-lg border border-border hover:border-accent transition-colors"
            >
              <div className="text-xs text-accent font-semibold">{r.unitNumber} · {r.unitTitle}</div>
              <div className="text-foreground mt-1">{r.match}</div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SearchPage;