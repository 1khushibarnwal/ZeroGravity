import { useState } from "react";

function truncate(value, lead = 8, tail = 6) {
  if (!value) return "";
  if (value.length <= lead + tail + 3) return value;
  return `${value.slice(0, lead)}…${value.slice(-tail)}`;
}

export default function HashBadge({ value, label }) {
  const [copied, setCopied] = useState(false);

  if (!value) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard access denied — silently ignore
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={value}
      className="group inline-flex items-center gap-2 text-left"
    >
      {label && <span className="text-xs text-parchment-faint">{label}</span>}
      <span className="hash group-hover:text-brass transition-colors">
        {truncate(value)}
      </span>
      <span className="text-xs text-parchment-faint">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}
