const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function IconBot(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="8" width="16" height="11" rx="2.5" />
      <path d="M12 8V5" />
      <circle cx="12" cy="3.5" r="1.5" />
      <path d="M9 13h.01M15 13h.01" strokeWidth={2.6} />
      <path d="M9.5 16.5h5" />
    </svg>
  );
}

export function IconZap(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2 5 13.5h6L11 22l8-11.5h-6L13 2z" />
    </svg>
  );
}

export function IconFile(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2.5h8L19 7.5v14H6v-19z" />
      <path d="M14 2.5v5h5" />
      <path d="M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function IconShip(props: { className?: string }) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5c3 2.5 4 6 4 9l-4 3-4-3c0-3 1-6.5 4-9z" />
      <circle cx="12" cy="9" r="1.6" />
      <path d="M8 14.5 5.5 18l3.5-.5M16 14.5 18.5 18l-3.5-.5" />
      <path d="M12 15v4.5" />
    </svg>
  );
}

export const shipIcons = {
  bot: IconBot,
  zap: IconZap,
  file: IconFile,
  ship: IconShip,
} as const;
