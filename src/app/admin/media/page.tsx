"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  FileText,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { subscribeToDoc, saveDocData } from "@/lib/firebase/services";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  createdAt: string;
}

const initialMedia: MediaItem[] = [
  {
    id: "med-1",
    name: "logo-emblem.png",
    url: "/logo-emblem.png",
    size: "42 KB",
    type: "image/png",
    createdAt: "2026-03-20",
  },
  {
    id: "med-2",
    name: "bsx-brand-mark.png",
    url: "/logo-emblem.png",
    size: "88 KB",
    type: "image/png",
    createdAt: "2026-03-21",
  },
];

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = subscribeToDoc<{ items: MediaItem[] }>(
      "media",
      "list",
      { items: initialMedia },
      (data) => {
        if (data && Array.isArray(data.items)) {
          setMediaList(data.items);
        }
      }
    );
    return () => unsub();
  }, []);

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(window.location.origin + item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this media file?")) {
      const updated = mediaList.filter((m) => m.id !== id);
      setMediaList(updated);
      await saveDocData("media", "list", { items: updated });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const newMedia: MediaItem = {
        id: `med-${Date.now()}`,
        name: file.name,
        url: dataUrl,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type || "image/png",
        createdAt: new Date().toISOString().split("T")[0],
      };

      const updated = [newMedia, ...mediaList];
      setMediaList(updated);
      setUploading(false);
      await saveDocData("media", "list", { items: updated });
    };

    reader.readAsDataURL(file);
  };

  const filtered = mediaList.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Media Library & Storage
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
                  Ready
                </span>
              </h1>
              <p className="text-sm text-silver">
                Upload brand assets, logos, and case study hero mockups with 1-click URL copying.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? "Uploading..." : "Upload New Asset"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media files by filename..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#090d1f] border border-border/60 text-white text-xs placeholder-silver/50 focus:outline-none focus:border-primary"
          />
        </div>

        <span className="text-xs font-mono text-silver">
          {filtered.length} {filtered.length === 1 ? "file" : "files"}
        </span>
      </div>

      {/* Grid of Media */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative p-3 rounded-2xl bg-[#090d1f]/90 border border-border/50 hover:border-primary/50 transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Thumbnail Preview */}
            <div className="w-full aspect-square rounded-xl bg-[#030612] border border-border/30 flex items-center justify-center p-3 relative overflow-hidden mb-3">
              {item.url.startsWith("/") || item.url.startsWith("data:") ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <FileText className="w-8 h-8 text-silver/60" />
              )}
            </div>

            {/* Meta */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white truncate" title={item.name}>
                {item.name}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-silver font-mono">
                <span>{item.size}</span>
                <span>{item.createdAt}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 mt-2 border-t border-border/30 flex items-center justify-between gap-1">
              <button
                onClick={() => handleCopyUrl(item)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-silver hover:text-white font-mono transition-colors flex-1 justify-center"
                title="Copy relative URL"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 rounded-md text-silver hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Asset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
