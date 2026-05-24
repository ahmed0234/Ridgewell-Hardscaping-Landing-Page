import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TransformationSection from "@/components/TransformationSection";
import ServicesSection from "@/components/WhatsIncludedSection";
import AreasServed from "@/components/Areasserved";
import PainProblemSection from "@/components/Painproblem";
import TrustBar from "@/components/Trustbar";
import ReviewsSection from "@/components/Review";
import RidgewellFAQCTA from "@/components/Faq";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <TransformationSection />
      <HowItWorksSection />
      <AreasServed />
      <PainProblemSection />
      <TrustBar />
      <ReviewsSection />
      <RidgewellFAQCTA />
      <Footer />
    </div>
  );
};

export default page;
