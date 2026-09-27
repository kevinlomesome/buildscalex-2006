"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageCircle, MapPin, Loader2, ArrowRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL, getWhatsAppLink } from "@/lib/constants";
import { submitContactLead } from "@/lib/firebase/services";
import { useCMS } from "@/context/cms-context";

const servicesList = [
  "Website Development",
  "Sales Funnels",
  "Performance Marketing (Meta Ads)",
  "AI & WhatsApp Automation",
  "CRM & Lead Management",
  "SEO & Organic Ranking",
  "UI/UX & Branding",
  "Full Growth System",
  "Other",
];

const budgetList = [
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,50,000",
  "₹2,50,000+",
];

const timelineList = [
  "Immediate (< 2 Weeks)",
  "2 - 4 Weeks",
  "1 - 2 Months",
  "Flexible",
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  budget: z.string().min(1, "Please select an estimated budget"),
  timeline: z.string().min(1, "Please select an estimated timeline"),
  description: z.string().min(10, "Please provide some details about your project"),
});

export function CtaSection() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { contact } = useCMS();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      services: ["Website Development"],
      budget: "₹50,00,00 - ₹1,00,000",
      timeline: "2 - 4 Weeks",
      description: "",
    },
  });

  const selectedServices = form.watch("services") || [];
  const selectedBudget = form.watch("budget") || "";
  const selectedTimeline = form.watch("timeline") || "";

  const toggleService = (service: string) => {
    const current = [...selectedServices];
    const index = current.indexOf(service);
    if (index > -1) {
      if (current.length > 1) {
        current.splice(index, 1);
        form.setValue("services", current, { shouldValidate: true });
      }
    } else {
      current.push(service);
      form.setValue("services", current, { shouldValidate: true });
    }
  };

  const selectBudget = (budget: string) => {
    form.setValue("budget", budget, { shouldValidate: true });
  };

  const selectTimeline = (timeline: string) => {
    form.setValue("timeline", timeline, { shouldValidate: true });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsRedirecting(true);

    // 1. Asynchronously save lead record into Firebase / Local CRM
    submitContactLead({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone || "",
      company: values.company || "",
      services: values.services,
      budget: values.budget,
      timeline: values.timeline,
      description: values.description,
      source: "contact_form",
      browser: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
      device: typeof window !== "undefined" && window.innerWidth < 768 ? "Mobile" : "Desktop",
    }).catch((err) => console.warn("Lead record notice:", err));

    // 2. Generate WhatsApp Message
    const message = `Hello Build Scale X,

I would like to discuss a project with your team.

━━━━━━━━━━━━━━━━━━━━━━

👤 Full Name:
${values.fullName}

📧 Email:
${values.email}

📱 Phone:
${values.phone || "N/A"}

🏢 Company / Brand:
${values.company || "N/A"}

💼 Services Required:
${values.services.join(", ")}

💰 Estimated Budget:
${values.budget}

📅 Expected Timeline:
${values.timeline}

📝 Project Details:
${values.description}

━━━━━━━━━━━━━━━━━━━━━━

Please contact me regarding this project.

Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const redirectUrl = `${WHATSAPP_URL}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(redirectUrl, "_blank");
      setIsRedirecting(false);
      form.reset();
    }, 1200);
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto rounded-3xl border border-border/80 bg-card/80 glass p-6 sm:p-10 md:p-12 lg:p-14 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Build Scale X Business Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4 font-heading">
                  {contact?.heading || "Let's"} <span className="text-[#38BDF8] dark:text-[#38BDF8]">{contact?.highlightText || "Talk."}</span>
                </h2>
                <p className="text-silver text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                  {contact?.description || "Got a project in mind? We'd love to hear about it. Send us a message and we'll respond within 24 hours."}
                </p>

                {/* 3 Contact Info Cards */}
                <div className="space-y-4">
                  {/* Email Card */}
                  <a
                    href={`mailto:${contact?.email || "buildscalex@gmail.com"}`}
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-border/70 bg-black/5 dark:bg-white/[0.03] hover:border-primary/50 hover:bg-black/10 dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-silver block font-medium">Email</span>
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contact?.email || "buildscalex@gmail.com"}
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp Card */}
                  <a
                    href={getWhatsAppLink("Hi Build Scale X, I would like to inquire about your services.")}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-border/70 bg-black/5 dark:bg-white/[0.03] hover:border-primary/50 hover:bg-black/10 dark:hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-silver block font-medium">WhatsApp</span>
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contact?.phone || "+91 79903 59221"}
                      </span>
                    </div>
                  </a>

                  {/* Location Card */}
                  <div className="flex items-center gap-4 p-3.5 rounded-2xl border border-border/70 bg-black/5 dark:bg-white/[0.03]">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-[#38BDF8] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-silver block font-medium">Location</span>
                      <span className="text-sm font-semibold text-foreground">
                        {contact?.location || "Remote {Gujarat, India}"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge at bottom of left column */}
              <div className="pt-8 mt-8 border-t border-border/60 hidden lg:block">
                <p className="text-xs text-silver/70 font-mono">
                  ⚡ Average Response Time: {contact?.averageResponseTime || "< 15 minutes"}
                </p>
              </div>
            </div>

            {/* Right Column: UX Tech Style Form with Services & Budget */}
            <div className="lg:col-span-7">
              {isRedirecting ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Loader2 className="w-12 h-12 text-[#38BDF8] animate-spin mb-6" />
                  <h3 className="text-2xl font-bold mb-2 text-foreground font-heading">
                    Connecting to WhatsApp...
                  </h3>
                  <p className="text-silver text-sm max-w-sm">
                    Preparing your project inquiry. You will be redirected momentarily.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Rahul Sharma"
                                className="bg-black/5 dark:bg-[#070b16] border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl py-6 px-4 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="rahul@startup.in"
                                type="email"
                                className="bg-black/5 dark:bg-[#070b16] border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl py-6 px-4 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 2: Phone (Optional) & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm">
                              Phone (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+91 98765 43210"
                                className="bg-black/5 dark:bg-[#070b16] border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl py-6 px-4 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm">
                              Company / Brand
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="TechIndia Pvt Ltd"
                                className="bg-black/5 dark:bg-[#070b16] border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl py-6 px-4 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-destructive text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 3: Services Required (Pill Chips) */}
                    <FormField
                      control={form.control}
                      name="services"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm block mb-1">
                            Services Required
                          </FormLabel>
                          <div className="flex flex-wrap gap-2.5 pt-1">
                            {servicesList.map((service) => {
                              const isSelected = selectedServices.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? "bg-primary/20 text-[#38BDF8] border border-primary shadow-[0_0_12px_rgba(56,189,248,0.25)] font-semibold"
                                      : "bg-black/5 dark:bg-[#070b16] border border-border/80 text-foreground/80 hover:border-border hover:text-foreground"
                                  }`}
                                >
                                  {service}
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Row 4: Estimated Budget (Pill Chips) */}
                    <FormField
                      control={form.control}
                      name="budget"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm block mb-1">
                            Estimated Budget (INR)
                          </FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                            {budgetList.map((budget) => {
                              const isSelected = selectedBudget === budget;
                              return (
                                <button
                                  key={budget}
                                  type="button"
                                  onClick={() => selectBudget(budget)}
                                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-center transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? "bg-primary/20 text-[#38BDF8] border border-primary shadow-[0_0_12px_rgba(56,189,248,0.25)] font-semibold"
                                      : "bg-black/5 dark:bg-[#070b16] border border-border/80 text-foreground/80 hover:border-border hover:text-foreground"
                                  }`}
                                >
                                  {budget}
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Row 5: Expected Timeline (Pill Chips) */}
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm block mb-1">
                            Expected Timeline
                          </FormLabel>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                            {timelineList.map((timeline) => {
                              const isSelected = selectedTimeline === timeline;
                              return (
                                <button
                                  key={timeline}
                                  type="button"
                                  onClick={() => selectTimeline(timeline)}
                                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-center transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? "bg-primary/20 text-[#38BDF8] border border-primary shadow-[0_0_12px_rgba(56,189,248,0.25)] font-semibold"
                                      : "bg-black/5 dark:bg-[#070b16] border border-border/80 text-foreground/80 hover:border-border hover:text-foreground"
                                  }`}
                                >
                                  {timeline}
                                </button>
                              );
                            })}
                          </div>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Row 6: Project Details */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90 font-medium text-xs sm:text-sm">
                            Project Details
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your goals, current challenges, and project vision..."
                              className="bg-black/5 dark:bg-[#070b16] border-border text-foreground placeholder:text-muted-foreground/60 rounded-xl p-4 text-sm min-h-[120px] focus-visible:ring-1 focus-visible:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-blue-600 text-white font-semibold text-sm sm:text-base py-5 rounded-xl transition-all shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 border border-primary/30"
                    >
                      <span>Send Project Brief &amp; Connect on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
