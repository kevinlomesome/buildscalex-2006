export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-4">
      {/* Subtle pulsing logo loader */}
      <div className="relative w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-pulse">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 animate-spin" />
      </div>

      <div className="space-y-2 text-center">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          Build Scale X
        </p>
        <p className="text-sm text-silver animate-pulse">
          Synchronizing Growth Systems...
        </p>
      </div>
    </div>
  );
}
