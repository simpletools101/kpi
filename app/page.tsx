import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BenefitsSection } from "@/components/benefits-section";
import { FeaturesSection } from "@/components/features-section";
import { CustomersSection } from "@/components/customers-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { V1, V2 } from "@/components/base/v-set";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <V2 title="Teamwork" />
        <V1 title="Bug and Issue Management" />
        <V2 title="KPI Management" />


        <CustomersSection />
        <IntegrationsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
