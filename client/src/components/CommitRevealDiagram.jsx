export default function CommitRevealDiagram() {
  return (
    <svg
      viewBox="0 0 640 140"
      className="mx-auto mt-14 w-full max-w-xl"
      role="img"
      aria-label="Diagram: seal, then wait, then reveal"
    >
      <line x1="90" y1="60" x2="320" y2="60" stroke="#332C54" strokeWidth="2" strokeDasharray="6 8" />
      <line x1="320" y1="60" x2="550" y2="60" stroke="#332C54" strokeWidth="2" />

      <g>
        <circle cx="90" cy="60" r="10" fill="#6E5BA6" />
        <text x="90" y="100" textAnchor="middle" fill="#B8B2CC" fontSize="14" fontFamily="IBM Plex Sans, sans-serif">
          Seal
        </text>
      </g>

      <g>
        <circle cx="320" cy="60" r="10" fill="#211D38" stroke="#332C54" strokeWidth="2" />
        <text x="320" y="100" textAnchor="middle" fill="#B8B2CC" fontSize="14" fontFamily="IBM Plex Sans, sans-serif">
          Wait
        </text>
      </g>

      <g>
        <circle cx="550" cy="60" r="12" fill="#E8B34C" className="veil-pulse" />
        <text x="550" y="100" textAnchor="middle" fill="#F1EDE4" fontSize="14" fontFamily="IBM Plex Sans, sans-serif">
          Reveal
        </text>
      </g>
    </svg>
  );
}