import { ProcessSection } from "@/components/sections/process";
import { CtaSection } from "@/components/sections/cta";

export const metadata = {
  title: "Our Process | Build Scale X",
  description: "Learn how we build scalable digital ecosystems from discovery to domination.",
};

export default function ProcessPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Process</h1>
        <p className="text-xl text-silver max-w-2xl mx-auto">
          A proven, systematic approach to delivering high-performance growth systems.
        </p>
      </div>
      <ProcessSection />
      <CtaSection />
    </div>
  );
}
