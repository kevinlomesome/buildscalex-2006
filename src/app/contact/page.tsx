import { CtaSection } from "@/components/sections/cta";

export const metadata = {
  title: "Contact Us | Build Scale X",
  description: "Get in touch with Build Scale X to discuss your project.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <CtaSection />
    </div>
  );
}
