import { Metadata } from "next";
import { BlogsClient } from "./blogs-client";

export const metadata: Metadata = {
  title: "Insights & Engineering Articles | Build Scale X",
  description:
    "Explore strategic insights on modern web development, high-converting acquisition funnels, AI automation systems, and technical scaling.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in"}/blogs`,
  },
  openGraph: {
    title: "Insights & Engineering Articles | Build Scale X",
    description:
      "Strategic insights on modern web development, high-converting funnels, AI automation, and technical scaling.",
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
