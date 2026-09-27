import { Metadata } from "next";
import { LegalPageView } from "@/components/legal-page-view";

export const metadata: Metadata = {
  title: "Privacy Policy | Build Scale X",
  description: "Privacy Policy and data governance for Build Scale X growth systems.",
};

export default function PrivacyPage() {
  return (
    <LegalPageView
      type="privacy"
      defaultTitle="Privacy Policy"
      defaultContent={
        <>
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">1. Architectural Data Governance</h2>
            <p className="mb-4">
              BuildScaleX respects your data integrity and is committed to protecting your privacy. This policy outlines how we handle data collected through our web platforms, consultation funnels, and automated CRM pipelines.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information provided directly by you through our strategy consultation forms, direct WhatsApp engagements, and analytics telemetry:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Identity &amp; Contact:</strong> Full name, verified business email address, phone/WhatsApp number, company name.</li>
              <li><strong className="text-foreground">Project Scoping:</strong> System requirements, target timelines, and estimated investment ranges.</li>
              <li><strong className="text-foreground">Technical Telemetry:</strong> Device type, IP address, referral sources, and Core Web Vitals performance events.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">3. How We Process Data</h2>
            <p className="mb-4">
              Collected data is processed strictly for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scoping and delivering custom digital systems, funnels, and AI agent architectures.</li>
              <li>Executing direct engineering communication and consultation scheduling.</li>
              <li>Maintaining system security, audit compliance, and disaster recovery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">4. Security &amp; Retention</h2>
            <p className="mb-4">
              All lead data is encrypted in transit via SSL/TLS and stored securely in role-based Firestore infrastructure. We do not sell or monetize client or prospect data.
            </p>
          </section>
        </>
      }
    />
  );
}
