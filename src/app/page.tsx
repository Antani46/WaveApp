import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import DashboardSection from "@/components/preventivatore/DashboardSection";
import ContactSection from "@/components/layout/ContactSection";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <DashboardSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
