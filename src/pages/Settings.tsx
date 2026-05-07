import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Trash2 } from "lucide-react";

const Settings = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mth166-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("mth166-theme", next ? "dark" : "light");
  };

  const clearPdfs = () => {
    if (!confirm("Delete all uploaded PDFs from this device?")) return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith("mth166-pdf-"))
      .forEach((k) => localStorage.removeItem(k));
    alert("All uploaded PDFs cleared.");
  };

  return (
    <AppLayout title="Settings">
      <div className="p-6 lg:p-10 max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h2>

        <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-between">
          <div>
            <div className="font-semibold text-foreground flex items-center gap-2">
              {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Theme
            </div>
            <div className="text-sm text-muted-foreground">Switch between light and dark mode.</div>
          </div>
          <Button variant="accent" onClick={toggle}>{dark ? "Light Mode" : "Dark Mode"}</Button>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-between">
          <div>
            <div className="font-semibold text-foreground flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> Clear stored PDFs
            </div>
            <div className="text-sm text-muted-foreground">Removes all uploaded unit PDFs from your browser.</div>
          </div>
          <Button variant="outline" onClick={clearPdfs}>Clear</Button>
        </div>

      </div>
      </div>
    </AppLayout>
  );
};

export default Settings;