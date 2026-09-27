import { notFound } from "next/navigation";
import { getDocData } from "@/lib/firebase/services";
import { ServiceItem } from "@/lib/cms-types";
import { defaultServices } from "@/lib/default-content";
import { ServiceDetailClient } from "./service-detail-client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

function findService(services: ServiceItem[], slug: string): ServiceItem | undefined {
  const normalizedSlug = slug.toLowerCase().replace(/^0\d+-/, "");
  return services.find(
    (s) =>
      s.id === slug ||
      s.id.toLowerCase().replace(/^0\d+-/, "") === normalizedSlug ||
      s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedSlug
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let services = defaultServices;
  try {
    const data = await getDocData<{ items: ServiceItem[] }>("services", "list", { items: defaultServices });
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      services = data.items;
    }
  } catch (e) {
    // fallback to default
  }

  const service = findService(services, slug);
  if (!service) {
    return { title: "Service Not Found | Build Scale X" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in";

  return {
    title: `${service.title} | Build Scale X Growth Architecture`,
    description:
      service.subtitle ||
      service.description ||
      `Explore enterprise ${service.title} architecture, custom engineering, and automated growth systems by BuildScaleX.`,
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Build Scale X`,
      description: service.subtitle || service.description,
      url: `${siteUrl}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let services = defaultServices;
  try {
    const data = await getDocData<{ items: ServiceItem[] }>("services", "list", { items: defaultServices });
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      services = data.items;
    }
  } catch (e) {
    // fallback to default
  }

  const service = findService(services, slug);
  if (!service || service.active === false) {
    notFound();
  }

  return <ServiceDetailClient initialService={service} slug={slug} />;
}
