import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TopicsSection from "@/components/TopicsSection";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TopicsSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
