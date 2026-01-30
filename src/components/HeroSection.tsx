import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Calculator, TrendingUp, Sigma } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Math symbols floating */}
        <div className="absolute top-1/4 right-1/4 text-primary-foreground/10 text-8xl font-mono animate-float" style={{ animationDelay: "1s" }}>∫</div>
        <div className="absolute bottom-1/3 left-1/5 text-primary-foreground/10 text-6xl font-mono animate-float" style={{ animationDelay: "3s" }}>∑</div>
        <div className="absolute top-1/2 right-1/6 text-primary-foreground/10 text-7xl font-mono animate-float" style={{ animationDelay: "2s" }}>∂</div>
      </div>

      <div className="container relative mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-sm font-medium text-primary-foreground/90">MTH166 Course Material</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Mathematics for
              <span className="block text-gradient bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                Engineers
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0">
              Master calculus, linear algebra, and differential equations with comprehensive study materials, examples, and practice problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl">
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Watch Overview
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/10">
              {[
                { value: "12+", label: "Chapters" },
                { value: "50+", label: "Examples" },
                { value: "100+", label: "Problems" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card/10 backdrop-blur-lg rounded-2xl p-8 border border-primary-foreground/10 shadow-hero">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Calculator className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Calculus</h3>
                      <p className="text-sm text-primary-foreground/60">Derivatives & Integrals</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Linear Algebra</h3>
                      <p className="text-sm text-primary-foreground/60">Matrices & Vectors</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sigma className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Differential Equations</h3>
                      <p className="text-sm text-primary-foreground/60">ODEs & Applications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-lg animate-float">
                <div className="text-accent-foreground font-mono text-sm">
                  ∫ f(x)dx = F(x) + C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
