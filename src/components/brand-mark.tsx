import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="group inline-flex items-center gap-3" href="/" aria-label="ПОЛУТОН — на главную">
      <span aria-hidden="true" className="relative grid h-9 w-9 grid-cols-2 overflow-hidden rounded-full border border-ink/20">
        <span className="bg-cobalt" />
        <span className="bg-persimmon" />
        <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-oyster" />
      </span>
      {!compact && (
        <span className="font-display text-[14px] font-semibold tracking-[-0.06em]">ПОЛУТОН</span>
      )}
    </Link>
  );
}
