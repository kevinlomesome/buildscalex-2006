"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Check,
  UserCheck,
  UserX,
  Mail,
  Lock,
  X,
  ShieldAlert
} from "lucide-react";
import { AdminUser, UserRole } from "@/lib/cms-types";
import { subscribeToDoc, saveDocData } from "@/lib/firebase/services";

const initialUsers: AdminUser[] = [
  {
    id: "usr-1",
    email: "buildscalex@gmail.com",
    displayName: "Super Admin (Owner)",
    role: "super_admin",
    createdAt: "2026-03-01",
    lastLogin: "Active Now",
    active: true,
  },
  {
    id: "usr-2",
    email: "leadmanager@buildscalex.com",
    displayName: "Sales & CRM Lead",
    role: "admin",
    createdAt: "2026-03-10",
    lastLogin: "2 hours ago",
    active: true,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<{
    user: AdminUser;
    isNew?: boolean;
  } | null>(null);

  useEffect(() => {
    const unsub = subscribeToDoc<{ items: AdminUser[] }>(
      "users",
      "list",
      { items: initialUsers },
      (data) => {
        if (data && Array.isArray(data.items)) {
          setUsers(data.items);
        }
      }
    );
    return () => unsub();
  }, []);

  const toggleUserActive = async (id: string) => {
    const target = users.find((u) => u.id === id);
    if (target?.role === "super_admin") {
      alert("The primary Super Admin cannot be deactivated.");
      return;
    }
    const updated = users.map((u) => (u.id === id ? { ...u, active: !u.active } : u));
    setUsers(updated);
    await saveDocData("users", "list", { items: updated });
  };

  const deleteUser = async (id: string) => {
    const target = users.find((u) => u.id === id);
    if (target?.role === "super_admin") {
      alert("Cannot delete primary Super Admin.");
      return;
    }
    if (confirm("Are you sure you want to remove this user's admin access?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      await saveDocData("users", "list", { items: updated });
    }
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    const { user, isNew } = editingUser;

    let updated: AdminUser[];
    if (isNew) {
      updated = [...users, user];
    } else {
      updated = users.map((u) => (u.id === user.id ? user : u));
    }

    setUsers(updated);
    setEditingUser(null);
    await saveDocData("users", "list", { items: updated });
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "admin":
        return "bg-primary/10 border-primary/20 text-primary";
      case "editor":
        return "bg-accent-blue/10 border-accent-blue/20 text-accent-blue";
      case "viewer":
        return "bg-white/5 border-white/10 text-silver";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                User Management & Permissions (RBAC)
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Secured
                </span>
              </h1>
              <p className="text-sm text-silver">
                Manage internal team members, access roles (Super Admin, Admin, Editor, Viewer), and credentials.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setEditingUser({
              isNew: true,
              user: {
                id: `usr-${Date.now()}`,
                email: "",
                displayName: "",
                role: "editor",
                createdAt: new Date().toISOString().split("T")[0],
                active: true,
              },
            })
          }
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#090d1f]/90 border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030612] border-b border-border/40 text-silver font-mono">
              <tr>
                <th className="py-3.5 px-4 font-normal">Name & Email</th>
                <th className="py-3.5 px-4 font-normal">Assigned Role</th>
                <th className="py-3.5 px-4 font-normal">Status</th>
                <th className="py-3.5 px-4 font-normal">Last Activity</th>
                <th className="py-3.5 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-silver">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <span className="font-bold text-white text-sm block">
                        {u.displayName}
                      </span>
                      <span className="font-mono text-silver/80 text-[11px] flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-silver/50" />
                        {u.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] uppercase font-bold ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      {u.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] ${
                        u.active
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          u.active ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                      {u.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-silver/70">
                    {u.lastLogin || "Never"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => toggleUserActive(u.id)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                        title={u.active ? "Deactivate User" : "Activate User"}
                      >
                        {u.active ? (
                          <UserX className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </button>

                      <button
                        onClick={() => setEditingUser({ user: u, isNew: false })}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-silver hover:text-white"
                        title="Edit User"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {u.role !== "super_admin" && (
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-rose-500/10 text-silver hover:text-rose-400"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-[#090d1f] border border-border/60 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>
                    {editingUser.isNew ? "Add Team Member" : "Edit Team Member"}
                  </span>
                </h3>
                <button
                  onClick={() => setEditingUser(null)}
                  className="p-1 rounded-lg text-silver hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.user.displayName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        user: { ...editingUser.user, displayName: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                    placeholder="Rahul Verma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editingUser.user.email}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        user: { ...editingUser.user, email: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm font-mono focus:outline-none focus:border-primary"
                    placeholder="name@buildscalex.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-silver mb-1.5">
                    Permission Role
                  </label>
                  <select
                    value={editingUser.user.role}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        user: {
                          ...editingUser.user,
                          role: e.target.value as UserRole,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#030612] border border-border/60 text-white text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="viewer">Viewer (Read-only access)</option>
                    <option value="editor">Editor (CMS updates only)</option>
                    <option value="admin">Admin (CMS + Lead CRM)</option>
                    <option value="super_admin">Super Admin (Full Root Control)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingUser.user.active}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          user: {
                            ...editingUser.user,
                            active: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 rounded text-emerald-400 focus:ring-0 bg-[#030612] border-border/60"
                    />
                    <span className="text-xs font-mono text-white">Active Account</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-silver hover:text-white text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:brightness-110 transition-colors"
                >
                  Save User
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
