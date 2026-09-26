import { IndustriesSection } from "@/components/sections/industries";
import { CtaSection } from "@/components/sections/cta";

export const metadata = {
  title: "Industries | Build Scale X",
  description: "Discover how Build Scale X tailors growth systems for different industries.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Industries We Serve</h1>
        <p className="text-xl text-silver max-w-2xl mx-auto">
          We build specialized digital systems customized to the unique needs of your market.
        </p>
      </div>
      <IndustriesSection />
      <CtaSection />
    </div>
  );
}
