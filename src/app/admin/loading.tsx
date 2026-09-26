export default function AdminLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b border-border/40 pb-6">
        <div className="space-y-2">
          <div className="h-7 w-64 bg-white/5 rounded-xl" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>
        <div className="h-10 w-32 bg-white/5 rounded-xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-48 bg-white/5 rounded-2xl border border-white/5" />
        <div className="h-48 bg-white/5 rounded-2xl border border-white/5" />
        <div className="h-48 bg-white/5 rounded-2xl border border-white/5" />
      </div>

      {/* Table Skeleton */}
      <div className="h-80 bg-white/5 rounded-2xl border border-white/5" />
    </div>
  );
}
