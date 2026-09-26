import { notFound } from "next/navigation";
import { getPages } from "@/lib/firebase/services";
import { DynamicPageClient } from "./dynamic-page-client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pages = await getPages();
  const page = pages.find((p) => p.slug === slug);
  if (!page) {
    return { title: "Page Not Found | Build Scale X" };
  }
  return {
    title: `${page.title} | Build Scale X`,
    description: page.metaDescription || "High-performance growth systems and conversion architecture.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in"}/${page.slug}`,
    },
    openGraph: {
      title: `${page.title} | Build Scale X`,
      description: page.metaDescription,
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
    },
  };
}

export default async function RootDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pages = await getPages();
  const page = pages.find((p) => p.slug === slug);

  if (!page || (!page.published && !page.archived)) {
    notFound();
  }

  return <DynamicPageClient initialPage={page} slug={slug} />;
}
