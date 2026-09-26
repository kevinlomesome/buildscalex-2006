"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Globe,
  Layers,
  Info,
  Briefcase,
  GitBranch,
  HelpCircle,
  Mail,
  Palette,
  FileText,
  Image as ImageIcon,
  Search,
  BarChart3,
  UserCheck,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Shield,
  Loader2,
  ChevronRight,
  FileCode2,
  History,
  RotateCcw
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { subscribeToLeads, subscribeToNotifications } from "@/lib/firebase/services";
import { LeadRecord, AdminNotification } from "@/lib/cms-types";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  highlight?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Leads & CRM",
    items: [
      { name: "Lead Manager", href: "/admin/leads", icon: Users, badge: "new" },
      { name: "WhatsApp Leads", href: "/admin/leads?source=whatsapp", icon: MessageSquare },
    ],
  },
  {
    title: "Website CMS",
    items: [
      { name: "Dynamic Page Builder", href: "/admin/pages", icon: FileCode2, highlight: "New" },
      { name: "Homepage CMS", href: "/admin/cms/homepage", icon: Globe },
      { name: "Services CMS", href: "/admin/cms/services", icon: Layers, highlight: "88 Categories" },
      { name: "About CMS", href: "/admin/cms/about", icon: Info },
      { name: "Industries CMS", href: "/admin/cms/industries", icon: Briefcase },
      { name: "Process CMS", href: "/admin/cms/process", icon: GitBranch },
      { name: "FAQ CMS", href: "/admin/cms/faq", icon: HelpCircle },
      { name: "Contact & Form Builder", href: "/admin/cms/contact", icon: Mail },
      { name: "Projects CMS", href: "/admin/cms/projects", icon: Palette },
      { name: "Testimonials CMS", href: "/admin/cms/testimonials", icon: UserCheck },
      { name: "Blog CMS", href: "/admin/cms/blogs", icon: FileText },
    ],
  },
  {
    title: "Platform & Growth",
    items: [
      { name: "Notification Center", href: "/admin/notifications", icon: Bell },
      { name: "Audit & Activity Logs", href: "/admin/activity", icon: History },
      { name: "Version History", href: "/admin/versions", icon: RotateCcw, highlight: "Rollback" },
      { name: "Media Library", href: "/admin/media", icon: ImageIcon },
      { name: "SEO Settings", href: "/admin/seo", icon: Search },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "User Management", href: "/admin/users", icon: Shield },
      { name: "Website Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);

  // If on /admin/login, bypass the admin frame
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  useEffect(() => {
    // Subscribe to leads count for badge notification
    const unsubLeads = subscribeToLeads((leads: LeadRecord[]) => {
      const unread = leads.filter((l) => l.status === "new").length;
      setNewLeadsCount(unread);
    });

    const unsubNotifs = subscribeToNotifications((notifs: AdminNotification[]) => {
      const unread = notifs.filter((n) => !n.read).length;
      setUnreadNotifsCount(unread);
    });

    return () => {
      unsubLeads();
      unsubNotifs();
    };
  }, []);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040711] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-sm text-silver font-mono">Loading Build Scale X Admin...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#030612] text-foreground flex antialiased">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 bg-[#050816] border-r border-border/70 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-border/70 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-border bg-[#030612] p-1 flex items-center justify-center shadow-lg group-hover:border-primary transition">
              <Image
                src="/logo-emblem.png"
                alt="BSX"
                width={36}
                height={36}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base text-foreground tracking-tight block">
                BUILDSCALEX
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] font-semibold -mt-1 block">
                Super Admin
              </span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg border border-border text-silver hover:text-foreground lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-silver/60 px-3 mb-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? "bg-primary/15 text-[#38BDF8] font-semibold border border-primary/30 shadow-sm"
                          : "text-foreground/75 hover:text-foreground hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-[#38BDF8]" : "text-silver group-hover:text-foreground"}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge === "new" && newLeadsCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                          {newLeadsCount}
                        </span>
                      )}
                      {item.highlight && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-secondary/15 text-cyan-300 font-mono">
                          {item.highlight}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-border/70 bg-black/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                {user.displayName?.charAt(0) || "A"}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-foreground truncate">{user.displayName}</div>
                <div className="text-[10px] text-silver truncate">{user.email}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-primary/20 text-[#38BDF8] text-[9px] font-mono font-bold uppercase shrink-0">
              {user.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/80 text-silver hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 text-xs font-medium transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-[#050816]/90 backdrop-blur-xl border-b border-border/70 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-border text-foreground hover:bg-white/5 lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2 text-xs text-silver">
              <Link href="/admin" className="hover:text-foreground">Admin</Link>
              <ChevronRight size={12} />
              <span className="text-foreground font-semibold capitalize">
                {pathname === "/admin" ? "Dashboard" : pathname.replace("/admin/", "").replace("cms/", "")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Website Link */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-white/[0.03] text-silver hover:text-foreground text-xs font-medium hover:border-primary/40 transition"
            >
              <span>Live Website</span>
              <ExternalLink size={12} />
            </Link>

            {/* Notification Icon */}
            <Link
              href="/admin/notifications"
              className="relative p-2 rounded-xl border border-border/80 bg-white/[0.03] text-silver hover:text-foreground transition"
              title="Notification Center"
            >
              <Bell size={16} />
              {(unreadNotifsCount > 0 || newLeadsCount > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadNotifsCount || newLeadsCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
