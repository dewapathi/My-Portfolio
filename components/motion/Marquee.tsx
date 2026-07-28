export default function Marquee({
  items,
  speed = 32,
  className,
  itemClassName,
}: {
  items: string[];
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
  itemClassName?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className={itemClassName ?? "pill-soft"}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
