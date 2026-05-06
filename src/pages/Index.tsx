import AppLayout from "@/components/AppLayout";
import { Link } from "react-router-dom";
import { units } from "@/data/units";

const Index = () => {
  return (
    <AppLayout title="MTH166 - Mathematics for Engineers">
      <div className="p-6 lg:p-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Course Units</h2>
          <p className="text-muted-foreground mt-1">
            Select a unit to view chapters and study material.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((u) => (
            <Link
              key={u.id}
              to={`/unit/${u.id}`}
              className="group block bg-card rounded-xl p-5 border border-border hover:border-accent shadow-card hover:shadow-card-hover transition-all"
            >
              <div className={`inline-block px-3 py-1 rounded-md text-xs font-semibold text-white bg-gradient-to-r ${u.color} mb-3`}>
                {u.number}
              </div>
              <h3 className="font-semibold text-foreground text-lg leading-snug group-hover:text-accent transition-colors">
                {u.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{u.description}</p>
              <div className="mt-4 text-xs text-muted-foreground">{u.chapters.length} chapters</div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
