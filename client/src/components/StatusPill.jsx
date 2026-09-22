const DOT_CLASS = {
  queued: "bg-signal-wait",
  committed: "bg-signal-wait",
  waiting: "bg-signal-wait",
  revealing: "bg-brass",
  ready: "bg-brass",
  executed: "bg-signal-good",
  revealed: "bg-signal-good",
  failed: "bg-signal-bad",
};

export default function StatusPill({ status, children }) {
  const dot = DOT_CLASS[status] || "bg-parchment-faint";

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-parchment-dim">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children || status}
    </span>
  );
}
