type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export const ArrowRight = ({ className }: P) => (<svg {...base} className={className}><path d="M5 12h14M12 5l7 7-7 7" /></svg>);
export const ArrowLeft = ({ className }: P) => (<svg {...base} className={className}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
export const ArrowUpRight = ({ className }: P) => (<svg {...base} className={className}><path d="M7 17 17 7M7 7h10v10" /></svg>);
export const Plus = ({ className }: P) => (<svg {...base} strokeWidth={1.4} className={className}><path d="M12 4v16M4 12h16" /></svg>);
export const Menu = ({ className }: P) => (<svg {...base} className={className} width={16} height={16}><path d="M4 8h16M4 16h16" /></svg>);
export const Close = ({ className }: P) => (<svg {...base} className={className} width={16} height={16}><path d="M6 6l12 12M18 6 6 18" /></svg>);
