const MODES = [
  {
    id: "self",
    title: "Self-custody",
    description: "Your wallet signs the commit and the reveal directly.",
  },
  {
    id: "managed",
    title: "Managed",
    description: "The relayer submits and reveals on your behalf.",
  },
  {
    id: "agent",
    title: "Agent",
    description: "Describe the transfer in plain language.",
  },
];

export default function ModeSelector({ mode, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-3">
      {MODES.map((m) => {
        const active = m.id === mode;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={`flex flex-col items-start gap-1 bg-ink px-5 py-4 text-left transition-colors ${
              active ? "bg-ink-surface" : "hover:bg-ink-soft"
            }`}
          >
            <span
              className={`font-display text-lg ${
                active ? "text-brass" : "text-parchment"
              }`}
            >
              {m.title}
            </span>
            <span className="text-sm text-parchment-faint">
              {m.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
