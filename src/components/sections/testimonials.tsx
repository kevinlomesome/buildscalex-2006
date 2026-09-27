"use client";

import { useCMS } from "@/context/cms-context";
import { Star, Quote, UserCheck } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const { testimonials } = useCMS();

  // Only render if active, real client testimonials exist
  const activeTestimonials = (testimonials || []).filter(
    (t) => t.active !== false && t.content?.trim()
  );

  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 relative bg-[#070911] border-y border-white/[0.06]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-silver uppercase tracking-wider mb-5">
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Partner Feedback &amp; Outcomes.
          </h2>
          <p className="text-silver text-base sm:text-lg leading-relaxed">
            Real feedback from business owners and founders scaling their operations with our custom digital systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#0B0E18] border border-white/[0.06] hover:border-white/15 p-7 rounded-2xl flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-silver leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.05] flex items-center gap-3">
                {item.avatarUrl ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={item.avatarUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {item.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {item.name}
                  </h4>
                  <p className="text-xs text-silver/60">
                    {item.role} {item.company ? `• ${item.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
