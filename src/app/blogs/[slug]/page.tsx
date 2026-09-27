import { notFound } from "next/navigation";
import { getDocData } from "@/lib/firebase/services";
import { BlogPost } from "@/lib/cms-types";
import { defaultBlogs } from "@/lib/default-content";
import { BlogDetailClient } from "./blog-detail-client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

function findPost(posts: BlogPost[], slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug || p.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let blogs = defaultBlogs;
  try {
    const data = await getDocData<{ items: BlogPost[] }>("blogs", "list", { items: defaultBlogs });
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      blogs = data.items;
    }
  } catch (e) {
    // fallback
  }

  const post = findPost(blogs, slug);
  if (!post) {
    return { title: "Article Not Found | Build Scale X" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://buildscalex.in";

  return {
    title: `${post.title} | Build Scale X Insights`,
    description: post.excerpt || post.content.slice(0, 160),
    alternates: {
      canonical: `${siteUrl}/blogs/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Build Scale X`,
      description: post.excerpt || post.content.slice(0, 160),
      url: `${siteUrl}/blogs/${slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let blogs = defaultBlogs;
  try {
    const data = await getDocData<{ items: BlogPost[] }>("blogs", "list", { items: defaultBlogs });
    if (data && Array.isArray(data.items) && data.items.length > 0) {
      blogs = data.items;
    }
  } catch (e) {
    // fallback
  }

  const post = findPost(blogs, slug);
  if (!post || post.published === false) {
    notFound();
  }

  return <BlogDetailClient initialPost={post} slug={slug} />;
}
