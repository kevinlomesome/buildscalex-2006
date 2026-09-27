import { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "Terms & Conditions | Build Scale X",
  description: "Terms and conditions governing Build Scale X systems engineering services.",
};

export default function TermsPage() {
  return (
    <LegalPageView
      type="terms"
      defaultTitle="Terms & Conditions"
      defaultContent={
        <>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing the BuildScaleX website or engaging our systems architecture services, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">2. Intellectual Property Transfer</h2>
            <p className="mb-4">
              Unless otherwise agreed in a specific Statement of Work (SOW), all custom production source code, Next.js codebases, automation scripts, and database configurations developed specifically for client projects are transferred with 100% intellectual property ownership upon final milestone completion.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">3. Service Engagements &amp; Roadmaps</h2>
            <p className="mb-4">
              All architectural engagements operate according to defined technical specifications, milestone roadmaps, and documented deliverables. Scope adjustments during development are governed by written change orders.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">4. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall BuildScaleX be liable for any indirect, incidental, or consequential damages arising from third-party cloud outages, external API modifications, or client-initiated production modifications.
            </p>
          </section>
        </>
      }
    />
  );
}
