import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { units } from "@/data/units";
import { BookOpenText } from "lucide-react";

const Read = () => {
  return (
    <AppLayout title="Read - Units">
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">All Units</h2>
        <p className="text-muted-foreground mb-8">Pick a unit to read its chapters and PDF.</p>
        <div className="space-y-3">
          {units.map((u) => (
            <Link
              key={u.id}
              to={`/unit/${u.id}`}
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-accent hover:shadow-card-hover transition-all"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${u.color} flex items-center justify-center text-white`}>
                <BookOpenText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-accent">{u.number}</div>
                <div className="font-semibold text-foreground truncate">{u.title}</div>
              </div>
              <span className="text-accent text-sm">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Read;
