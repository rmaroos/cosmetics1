/**
 * Decorative botanical line-art (leaves, sprigs, small flowers) used to soften
 * empty space around sections. Purely decorative: hidden from screen readers,
 * ignores pointer events, and hidden on small screens.
 */

type MotifProps = { className?: string };

const svgBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

// A single leaf pointing along +x, base at the origin.
const LEAF = 'M0 0 C 5 -8, 16 -10, 24 -3 C 16 3, 6 5, 0 0 Z';
const LEAF_VEIN = 'M1 0 L 21 -3';

function Leaf({ x, y, r, s = 1 }: { x: number; y: number; r: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={LEAF} />
      <path d={LEAF_VEIN} strokeWidth={0.8} />
    </g>
  );
}

/** Curved stem with alternating leaves. */
export function LeafSprig({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...svgBase}>
      <path d="M14 112 C 34 86, 58 54, 104 14" />
      <Leaf x={30} y={92} r={-100} s={0.9} />
      <Leaf x={34} y={87} r={10} s={0.9} />
      <Leaf x={50} y={70} r={-110} />
      <Leaf x={55} y={64} r={0} />
      <Leaf x={72} y={47} r={-118} s={0.9} />
      <Leaf x={78} y={41} r={-10} s={0.9} />
      <Leaf x={93} y={26} r={-120} s={0.7} />
      <Leaf x={98} y={20} r={-25} s={0.7} />
    </svg>
  );
}

/** Small five-petal flower on a short stem with one leaf. */
export function SmallFlower({ className }: MotifProps) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="0 0 120 120" className={className} {...svgBase}>
      <g transform="translate(62 42)">
        {petals.map((a) => (
          <ellipse key={a} cx={0} cy={-13} rx={7} ry={12} transform={`rotate(${a})`} />
        ))}
        <circle r={4.5} className="text-gold/50" stroke="currentColor" />
        <circle r={1.2} fill="currentColor" stroke="none" className="text-gold/50" />
      </g>
      <path d="M60 62 C 56 80, 50 96, 40 112" />
      <Leaf x={54} y={84} r={-160} s={1.1} />
      <Leaf x={49} y={95} r={-30} s={0.8} />
    </svg>
  );
}

/** Branch with paired leaves and two small buds. */
export function OliveBranch({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 140 80" className={className} {...svgBase}>
      <path d="M6 66 C 40 58, 80 40, 132 14" />
      <Leaf x={28} y={60} r={-80} s={0.85} />
      <Leaf x={30} y={60} r={30} s={0.85} />
      <Leaf x={56} y={51} r={-95} />
      <Leaf x={59} y={50} r={15} />
      <Leaf x={86} y={38} r={-105} s={0.9} />
      <Leaf x={89} y={36} r={5} s={0.9} />
      <Leaf x={112} y={25} r={-115} s={0.75} />
      <Leaf x={115} y={23} r={-10} s={0.75} />
      <circle cx={132} cy={14} r={2.5} className="text-gold/50" />
      <circle cx={44} cy={49} r={2} className="text-gold/50" />
    </svg>
  );
}

/** Tiny bud / petal cluster for filling small gaps. */
export function Bud({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...svgBase}>
      <path d="M20 8 C 12 14, 12 24, 20 30 C 28 24, 28 14, 20 8 Z" />
      <path d="M20 30 L 20 38" />
      <path d="M20 12 L 20 27" strokeWidth={0.8} />
    </svg>
  );
}

export type BotanicalLayout = 'a' | 'b' | 'c' | 'd';

const wrap = 'pointer-events-none absolute hidden select-none md:block';
const tone = 'text-sage/30';

/**
 * Places a pair of motifs in the corners of a `relative` section.
 * Vary the layout between neighbouring sections so it doesn't feel repetitive.
 */
export function SectionBotanicals({ layout = 'a' }: { layout?: BotanicalLayout }) {
  switch (layout) {
    case 'a':
      return (
        <div aria-hidden="true">
          <LeafSprig className={`${wrap} ${tone} -right-4 top-4 h-28 w-28 -scale-x-100 lg:right-2 lg:h-32 lg:w-32`} />
          <Bud className={`${wrap} ${tone} bottom-6 left-4 h-8 w-8 rotate-[-20deg] lg:left-10`} />
          <Bud className={`${wrap} ${tone} bottom-12 left-14 h-5 w-5 rotate-[25deg] lg:left-20`} />
        </div>
      );
    case 'b':
      return (
        <div aria-hidden="true">
          <SmallFlower className={`${wrap} ${tone} right-4 top-2 h-24 w-24 rotate-12 lg:right-12 lg:h-28 lg:w-28`} />
          <OliveBranch className={`${wrap} ${tone} -left-6 bottom-2 h-16 w-28 lg:h-20 lg:w-36`} />
        </div>
      );
    case 'c':
      return (
        <div aria-hidden="true">
          <OliveBranch className={`${wrap} ${tone} right-2 top-6 h-16 w-28 -scale-x-100 lg:right-8 lg:h-20 lg:w-36`} />
          <SmallFlower className={`${wrap} ${tone} -left-2 bottom-0 h-20 w-20 -rotate-12 lg:left-4 lg:h-24 lg:w-24`} />
        </div>
      );
    case 'd':
      return (
        <div aria-hidden="true">
          <Bud className={`${wrap} ${tone} right-24 top-10 h-6 w-6 rotate-12`} />
          <LeafSprig className={`${wrap} ${tone} -right-2 top-2 h-24 w-24 rotate-[-8deg] -scale-x-100 lg:h-28 lg:w-28`} />
          <LeafSprig className={`${wrap} ${tone} -left-4 bottom-0 h-24 w-24 rotate-[8deg] lg:h-28 lg:w-28`} />
        </div>
      );
  }
}
