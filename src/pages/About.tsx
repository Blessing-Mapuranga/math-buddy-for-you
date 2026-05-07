import AppLayout from "@/components/AppLayout";
import { Info } from "lucide-react";

const About = () => {
  return (
    <AppLayout title="About">
      <div className="p-6 lg:p-10 max-w-2xl mx-auto">
        <div className="bg-card rounded-xl p-8 border border-border text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Info className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">About</h2>
          <p className="text-muted-foreground">
            MTH166 — Mathematics for Engineers
          </p>
          <p className="text-foreground font-medium">
            Developed by Blessing Mapuranga
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;
