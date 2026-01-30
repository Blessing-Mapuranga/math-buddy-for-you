import { 
  Calculator, 
  TrendingUp, 
  Sigma, 
  Grid3X3, 
  LineChart, 
  Infinity, 
  Binary,
  Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";

const topics = [
  {
    icon: Calculator,
    title: "Differentiation",
    description: "Master derivatives, chain rule, implicit differentiation, and applications in optimization.",
    chapters: 3,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Sigma,
    title: "Integration",
    description: "Learn definite and indefinite integrals, techniques of integration, and applications.",
    chapters: 4,
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Grid3X3,
    title: "Matrices",
    description: "Understand matrix operations, determinants, inverse matrices, and eigenvalues.",
    chapters: 3,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: TrendingUp,
    title: "Vectors",
    description: "Explore vector algebra, dot and cross products, and applications in physics.",
    chapters: 2,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Waves,
    title: "Differential Equations",
    description: "Solve first and second order ODEs with various methods and engineering applications.",
    chapters: 4,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: LineChart,
    title: "Laplace Transforms",
    description: "Apply Laplace transforms to solve differential equations and analyze systems.",
    chapters: 2,
    color: "from-sky-500 to-sky-600",
  },
  {
    icon: Infinity,
    title: "Series & Sequences",
    description: "Study convergence, Taylor series, Fourier series, and their applications.",
    chapters: 3,
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: Binary,
    title: "Numerical Methods",
    description: "Learn numerical solutions for equations, integration, and differential equations.",
    chapters: 2,
    color: "from-slate-500 to-slate-600",
  },
];

const TopicsSection = () => {
  return (
    <section id="topics" className="py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Course Content</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Explore Topics
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive coverage of essential mathematical concepts for engineering students
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div
              key={topic.title}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <topic.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-accent transition-colors">
                {topic.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {topic.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {topic.chapters} chapters
                </span>
                <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Topics
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
