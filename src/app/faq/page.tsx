import { FaqSection } from "@/components/sections/faq";
import { CtaSection } from "@/components/sections/cta";

export const metadata = {
  title: "FAQ | Build Scale X",
  description: "Frequently asked questions about Build Scale X.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <FaqSection />
      <CtaSection />
    </div>
  );
}
