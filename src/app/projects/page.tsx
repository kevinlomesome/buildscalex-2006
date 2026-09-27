import { Metadata } from "next";
import { ProjectsClient } from "./projects-client";

export const metadata: Metadata = {
  title: "Case Studies & Architectural Portfolio | Build Scale X",
  description:
    "Explore verified production systems, custom web architectures, AI automation engines, and client acquisition funnels built by BuildScaleX.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in"}/projects`,
  },
  openGraph: {
    title: "Case Studies & Architectural Portfolio | Build Scale X",
    description:
      "Explore verified production systems, custom web architectures, AI automation engines, and client acquisition funnels.",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
