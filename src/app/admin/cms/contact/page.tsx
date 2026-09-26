"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Save,
  Check,
  Plus,
  Trash2,
  Edit2,
  Sliders,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Layers,
  IndianRupee,
  Calendar,
  Briefcase,
  HelpCircle,
  FileText,
  Send,
  Zap
} from "lucide-react";
import { useCMS } from "@/context/cms-context";
import { ContactSettings, FormFieldConfig } from "@/lib/cms-types";
import { saveDocData } from "@/lib/firebase/services";

export const FORM_PRESETS: { name: string; description: string; icon: any; fields: FormFieldConfig[] }[] = [
  {
    name: "Enterprise Project Brief",
    description: "Standard high-ticket B2B inquiry form with budget and timeline triage",
    icon: Zap,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Full Name", type: "text", placeholder: "e.g. John Doe", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Work Email", type: "email", placeholder: "john@company.com", required: true, order: 2, active: true },
      { id: "field-phone", name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: false, order: 3, active: true },
      { id: "field-company", name: "company", label: "Company / Brand Name", type: "text", placeholder: "e.g. Acme Corp", required: false, order: 4, active: true },
      { id: "field-services", name: "services", label: "Select Growth Solutions", type: "pill_multi_select", required: true, order: 5, active: true, options: ["Website Development", "Sales Funnels", "Meta Ads", "WhatsApp Automation", "CRM & Leads", "Full Growth System"] },
      { id: "field-budget", name: "budget", label: "Estimated Investment Budget", type: "pill_single_select", required: true, order: 6, active: true, options: ["₹25,000 - ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹2,50,000", "₹2,50,000+"] },
      { id: "field-timeline", name: "timeline", label: "Target Execution Timeline", type: "pill_single_select", required: true, order: 7, active: true, options: ["Immediate (< 2 Weeks)", "2 - 4 Weeks", "1 - 2 Months", "Flexible"] },
      { id: "field-description", name: "description", label: "Project Objectives & Scope", type: "textarea", placeholder: "Describe your business goals...", required: true, order: 8, active: true },
    ]
  },
  {
    name: "Careers & Talent Application",
    description: "Application form for engineers, growth marketers, and designers",
    icon: Briefcase,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true, order: 2, active: true },
      { id: "field-phone", name: "phone", label: "Mobile / WhatsApp", type: "tel", placeholder: "+91 98765 43210", required: true, order: 3, active: true },
      { id: "field-role", name: "role", label: "Role Applied For", type: "pill_single_select", required: true, order: 4, active: true, options: ["Full Stack Next.js Engineer", "Growth Marketing Lead", "UI/UX Product Designer", "Automation Specialist"] },
      { id: "field-experience", name: "experience", label: "Years of Experience", type: "pill_single_select", required: true, order: 5, active: true, options: ["1 - 2 Years", "3 - 5 Years", "5+ Years", "Fresh Graduate / Intern"] },
      { id: "field-portfolio", name: "portfolio", label: "GitHub / Portfolio / LinkedIn URL", type: "text", placeholder: "https://linkedin.com/in/...", required: true, order: 6, active: true },
      { id: "field-description", name: "description", label: "Why Build Scale X?", type: "textarea", placeholder: "Tell us about impactful systems you've built...", required: true, order: 7, active: true },
    ]
  },
  {
    name: "Instant Quote Request",
    description: "Rapid estimate calculator and project scope intake",
    icon: IndianRupee,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Contact Person", type: "text", placeholder: "Jane Smith", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Email for Quote", type: "email", placeholder: "jane@company.com", required: true, order: 2, active: true },
      { id: "field-phone", name: "phone", label: "WhatsApp for PDF Quote", type: "tel", placeholder: "+91 98765 43210", required: true, order: 3, active: true },
      { id: "field-services", name: "services", label: "Services to Quote", type: "pill_multi_select", required: true, order: 4, active: true, options: ["Custom Next.js Website", "Performance Marketing", "CRM Architecture", "WhatsApp AI Bot"] },
      { id: "field-budget", name: "budget", label: "Budget Range", type: "pill_single_select", required: true, order: 5, active: true, options: ["₹50,000", "₹1,00,000", "₹2,50,000", "₹5,00,000+"] },
      { id: "field-description", name: "description", label: "Specific Requirements", type: "textarea", placeholder: "Any specific deadlines, references, or third-party integrations...", required: true, order: 6, active: true },
    ]
  },
  {
    name: "Book Consultation Call",
    description: "Direct executive calendar booking and business qualification",
    icon: Calendar,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Executive Name", type: "text", placeholder: "Dr. Vikram Patel", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Business Email", type: "email", placeholder: "vikram@hospital.org", required: true, order: 2, active: true },
      { id: "field-phone", name: "phone", label: "Direct Phone", type: "tel", placeholder: "+91 98765 43210", required: true, order: 3, active: true },
      { id: "field-company", name: "company", label: "Organization / Firm", type: "text", placeholder: "Apex Health Group", required: true, order: 4, active: true },
      { id: "field-timeline", name: "timeline", label: "Preferred Call Window", type: "pill_single_select", required: true, order: 5, active: true, options: ["Today (Urgent)", "Tomorrow Morning", "This Week", "Weekend"] },
      { id: "field-description", name: "description", label: "Core Bottleneck to Solve", type: "textarea", placeholder: "What is your primary revenue or automation hurdle right now?", required: true, order: 6, active: true },
    ]
  },
  {
    name: "Franchise & Partner Inquiry",
    description: "Expansion inquiry intake for territory licensing and partnerships",
    icon: Layers,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Investor / Partner Name", type: "text", placeholder: "Rajesh Singhal", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Official Email", type: "email", placeholder: "rajesh@investments.in", required: true, order: 2, active: true },
      { id: "field-phone", name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: true, order: 3, active: true },
      { id: "field-budget", name: "budget", label: "Investment Capacity", type: "pill_single_select", required: true, order: 4, active: true, options: ["₹10 - ₹25 Lakhs", "₹25 - ₹50 Lakhs", "₹50 Lakhs - 1 Crore", "1 Crore+"] },
      { id: "field-description", name: "description", label: "Target Region & Business Background", type: "textarea", placeholder: "Describe target geographical region and existing business infrastructure...", required: true, order: 5, active: true },
    ]
  },
  {
    name: "Priority Support Ticket",
    description: "Client ticket reporting with system URL and error details",
    icon: HelpCircle,
    fields: [
      { id: "field-fullName", name: "fullName", label: "Reporter Name", type: "text", placeholder: "Client Tech Lead", required: true, order: 1, active: true },
      { id: "field-email", name: "email", label: "Account Email", type: "email", placeholder: "client@brand.com", required: true, order: 2, active: true },
      { id: "field-company", name: "company", label: "Project / Domain", type: "text", placeholder: "https://yourbrand.com", required: true, order: 3, active: true },
      { id: "field-timeline", name: "timeline", label: "Severity Level", type: "pill_single_select", required: true, order: 4, active: true, options: ["Critical (Outage)", "High (Conversion Blocker)", "Medium (Feature Glitch)", "Low (Minor Update)"] },
      { id: "field-description", name: "description", label: "Issue Description & Steps to Reproduce", type: "textarea", placeholder: "Describe exact issue, affected browser, and error messages observed...", required: true, order: 5, active: true },
    ]
  }
];

export default function ContactCmsPage() {
  const { contact: initialSettings } = useCMS();
  const [settings, setSettings] = useState<ContactSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<"details" | "form_builder">("details");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialSettings && initialSettings.email) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  // Field Edit Modal
  const [editingField, setEditingField] = useState<{
    field: FormFieldConfig;
    isNew?: boolean;
  } | null>(null);

  // New Pill Option State
  const [newPillText, setNewPillText] = useState("");

  const handleSaveToFirestore = async () => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveDocData("contact", "config", settings);
      await saveDocData("contact", "settings", settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save contact settings to Firebase");
    } finally {
      setSaving(false);
    }
  };

  const toggleFieldActive = (fieldId: string) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === fieldId ? { ...f, active: !f.active } : f
      ),
    }));
  };

  const toggleFieldRequired = (fieldId: string) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((f) =>
        f.id === fieldId ? { ...f, required: !f.required } : f
      ),
    }));
  };

  const deleteField = (fieldId: string) => {
    if (confirm("Are you sure you want to remove this form field?")) {
      setSettings((prev) => ({
        ...prev,
        fields: prev.fields.filter((f) => f.id !== fieldId),
      }));
    }
  };

  const handleSaveField = () => {
    if (!editingField) return;
    const { field, isNew } = editingField;

    setSettings((prev) => {
      let updatedFields = [...prev.fields];
      if (isNew) {
        updatedFields.push(field);
      } else {
        updatedFields = updatedFields.map((f) => (f.id === field.id ? field : f));
      }
      return { ...prev, fields: updatedFields };
    });

    setEditingField(null);
  };

  const addOptionToPillField = (fieldId: string) => {
    if (!newPillText.trim()) return;
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => {
        if (f.id !== fieldId) return f;
        const currentOptions = f.options || [];
        if (currentOptions.includes(newPillText.trim())) return f;
        return {
          ...f,
          options: [...currentOptions, newPillText.trim()],
        };
      }),
    }));
    setNewPillText("");
  };

  const removeOptionFromPillField = (fieldId: string, optionToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => {
        if (f.id !== fieldId) return f;
        return {
          ...f,
          options: (f.options || []).filter((opt) => opt !== optionToRemove),
        };
      }),
    }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Contact & Dynamic Form Builder
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Live Synced
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage contact communication channels, response targets, and customize dynamic form fields.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveToFirestore}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {saving ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : savedSuccess ? (
              <Check className="w-4 h-4 text-emerald-300" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{savedSuccess ? "Saved to Cloud!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/40 pb-px">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "details"
              ? "border-primary text-white bg-primary/5 rounded-t-xl"
              : "border-transparent text-silver hover:text-white"
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact Information & Copy</span>
        </button>
        <button
          onClick={() => setActiveTab("form_builder")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "form_builder"
              ? "border-primary text-white bg-primary/5 rounded-t-xl"
              : "border-transparent text-silver hover:text-white"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Dynamic Form Fields & Multi-Select Pills</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono">
            {settings.fields.length}
          </span>
        </button>
      </div>

      {/* TAB 1: Contact Details & Copy */}
      {activeTab === "details" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Copy */}
          <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Section Heading & Subtext</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Heading Prefix
                </label>
                <input
                  type="text"
                  value={settings.heading}
                  onChange={(e) => setSettings({ ...settings, heading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
                  placeholder="Let's"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5">
                  Highlight Text
                </label>
                <input
                  type="text"
                  value={settings.highlightText}
                  onChange={(e) => setSettings({ ...settings, highlightText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
                  placeholder="Talk."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5">
                Description Subtitle
              </label>
              <textarea
                rows={3}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent-blue" />
                <span>Average Response Target</span>
              </label>
              <input
                type="text"
                value={settings.averageResponseTime}
                onChange={(e) => setSettings({ ...settings, averageResponseTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
                placeholder="< 15 minutes"
              />
            </div>
          </div>

          {/* Direct Channels */}
          <div className="p-6 rounded-2xl bg-[#090d1f]/80 border border-border/50 space-y-5">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Official Channels</span>
            </h3>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>Inquiry Email Address</span>
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-accent-blue" />
                  <span>Display Phone</span>
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Number (Digits Only)</span>
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary font-mono"
                  placeholder="917990359221"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-silver mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Location / Office</span>
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Dynamic Form Builder */}
      {activeTab === "form_builder" && (
        <div className="space-y-6">
          {/* Dynamic Form Preset Templates */}
          <div className="p-5 rounded-2xl bg-[#090d1f] border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-silver flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
                <span>Enterprise Dynamic Form Presets (1-Click Switch)</span>
              </h4>
              <span className="text-[10px] text-silver/60 font-mono">
                Replaces current active form schema
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {FORM_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.name}
                    onClick={() => {
                      if (
                        confirm(
                          `Load "${preset.name}" preset? This will configure ${preset.fields.length} dynamic fields for this form.`
                        )
                      ) {
                        setSettings((prev) => ({
                          ...prev,
                          fields: preset.fields,
                        }));
                      }
                    }}
                    className="p-3 rounded-xl bg-white/[0.02] border border-border/50 hover:border-primary/40 hover:bg-primary/5 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform mb-2">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-silver/60 font-mono mt-0.5">
                        {preset.fields.length} fields
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-[#090d1f] to-accent-blue/10 border border-primary/20">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Active Form Configuration</span>
              </h3>
              <p className="text-xs text-silver mt-1">
                Customize every input, label, placeholder, required flag, or manage options for pills (services, budget, timeline).
              </p>
            </div>
            <button
              onClick={() =>
                setEditingField({
                  isNew: true,
                  field: {
                    id: `field-${Date.now()}`,
                    name: "customField",
                    label: "New Field",
                    type: "text",
                    placeholder: "Enter details...",
                    required: false,
                    order: settings.fields.length + 1,
                    active: true,
                  },
                })
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Custom Field</span>
            </button>
          </div>

          {/* Fields List */}
          <div className="space-y-4">
            {settings.fields.map((field, idx) => (
              <div
                key={field.id}
                className="p-5 rounded-2xl bg-[#090d1f]/90 border border-border/50 hover:border-primary/30 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-silver font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{field.label}</h4>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-silver">
                          {field.type}
                        </span>
                        {field.required && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                            Required
                          </span>
                        )}
                        {!field.active && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-silver font-mono mt-0.5">
                        name: <span className="text-accent-blue">{field.name}</span>
                        {field.placeholder && (
                          <span className="ml-3 text-silver/60">
                            placeholder: &quot;{field.placeholder}&quot;
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFieldActive(field.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        field.active
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                          : "bg-white/5 border-white/10 text-silver"
                      }`}
                    >
                      {field.active ? "Active" : "Disabled"}
                    </button>
                    <button
                      onClick={() => toggleFieldRequired(field.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        field.required
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-white/5 border-white/10 text-silver"
                      }`}
                    >
                      {field.required ? "* Required" : "Optional"}
                    </button>
                    <button
                      onClick={() => setEditingField({ field, isNew: false })}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white transition-colors"
                      title="Edit field settings"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteField(field.id)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 text-silver hover:text-rose-400 transition-colors"
                      title="Delete field"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pill Options Editor (if type is pills or dropdown) */}
                {field.type === "pills" && (
                  <div className="pt-3 border-t border-border/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-silver">
                        Selectable Options ({field.options?.length || 0}):
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(field.options || []).map((option) => (
                        <span
                          key={option}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white"
                        >
                          {option}
                          <button
                            onClick={() => removeOptionFromPillField(field.id, option)}
                            className="text-silver hover:text-rose-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Add option bar */}
                    <div className="flex items-center gap-2 max-w-md pt-1">
                      <input
                        type="text"
                        value={newPillText}
                        onChange={(e) => setNewPillText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addOptionToPillField(field.id);
                          }
                        }}
                        placeholder={`Add option to ${field.label}...`}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-[#030612] border border-border/50 text-xs text-white placeholder-silver/40 focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => addOptionToPillField(field.id)}
                        className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-xs text-primary font-medium hover:bg-primary/30 transition-colors"
                      >
                        Add Pill
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Field Modal */}
      <AnimatePresence>
        {editingField && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <span>{editingField.isNew ? "Add New Form Field" : "Edit Form Field"}</span>
                </h3>
                <button
                  onClick={() => setEditingField(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Field Label (Visible to User)
                  </label>
                  <input
                    type="text"
                    value={editingField.field.label}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        field: { ...editingField.field, label: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Field Name (Key)
                    </label>
                    <input
                      type="text"
                      value={editingField.field.name}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          field: { ...editingField.field, name: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver mb-1.5">
                      Input Type
                    </label>
                    <select
                      value={editingField.field.type}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          field: {
                            ...editingField.field,
                            type: e.target.value as FormFieldConfig["type"],
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="text">Text Input</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="textarea">Textarea (Multiline)</option>
                      <option value="pills">Pills (Multi-select / Single select)</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="number">Number</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Placeholder Text
                  </label>
                  <input
                    type="text"
                    value={editingField.field.placeholder || ""}
                    onChange={(e) =>
                      setEditingField({
                        ...editingField,
                        field: { ...editingField.field, placeholder: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingField.field.required}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          field: { ...editingField.field, required: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-primary focus:ring-0 bg-[#030612] border-border/60"
                    />
                    <span className="text-xs font-mono text-white">Required Field</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingField.field.active}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          field: { ...editingField.field, active: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-400 focus:ring-0 bg-[#030612] border-border/60"
                    />
                    <span className="text-xs font-mono text-white">Active (Visible)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  onClick={() => setEditingField(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-silver hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveField}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110 transition-colors"
                >
                  Save Field
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
