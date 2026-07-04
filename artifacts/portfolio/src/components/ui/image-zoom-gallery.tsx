import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

export type ZoomImage = { src: string; alt: string; theme?: "light" | "dark" };
export type ZoomImageGroup = {
  layout: "single" | "pair" | "trio" | "quad";
  caption?: string;
  images: ZoomImage[];
};

const gridFor = (layout: ZoomImageGroup["layout"]) => {
  switch (layout) {
    case "single": return "grid grid-cols-1";
    case "pair":   return "grid grid-cols-2 gap-3";
    case "trio":   return "grid grid-cols-2 sm:grid-cols-3 gap-3";
    case "quad":   return "grid grid-cols-2 md:grid-cols-4 gap-3";
  }
};
const containerFor = (layout: ZoomImageGroup["layout"]) => {
  switch (layout) {
    case "single": return "max-w-3xl mx-auto";
    case "pair":   return "max-w-md mx-auto";
    case "trio":   return "max-w-lg mx-auto";
    case "quad":   return "max-w-2xl mx-auto";
  }
};

export function ImageZoomGallery({ groups, color }: { groups: ZoomImageGroup[]; color?: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const resetZoom = () => { setScale(1); setOffset({ x: 0, y: 0 }); };
  const close = () => { setLightbox(null); resetZoom(); };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const clampScale = (s: number) => Math.min(5, Math.max(1, s));
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = clampScale(s - e.deltaY * 0.0015 * s);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (scale === 1) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setOffset({
      x: drag.current.ox + (e.clientX - drag.current.x),
      y: drag.current.oy + (e.clientY - drag.current.y),
    });
  };
  const onPointerUp = () => { drag.current = null; };
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinch.current = { dist: Math.hypot(dx, dy), scale };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const d = Math.hypot(dx, dy);
      setScale(clampScale(pinch.current.scale * (d / pinch.current.dist)));
    }
  };
  const onTouchEnd = () => { pinch.current = null; if (scale === 1) setOffset({ x: 0, y: 0 }); };

  if (!groups?.length) return null;

  return (
    <>
      <div className="flex flex-col gap-8">
        {groups.map((group, gi) => (
          <div key={gi} className={`flex flex-col gap-3 ${containerFor(group.layout)}${group.layout === "single" && color ? " relative" : ""}`}>
            {group.layout === "single" && color && (
              <div
                className="absolute -inset-8 pointer-events-none -z-10"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${color}0d 0%, transparent 70%)` }}
              />
            )}
            {group.caption && (
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-mono text-center">
                {group.caption}
              </span>
            )}
            <div className={gridFor(group.layout)}>
              {group.images.map((img, ii) => (
                <figure key={ii} className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setLightbox({ src: img.src, alt: img.alt }); resetZoom(); }}
                    className="group relative block w-full overflow-hidden rounded-lg border border-border bg-foreground/5 hover:border-text-secondary/40 transition cursor-zoom-in"
                    aria-label={`Zoom: ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={group.layout === "single" ? "w-auto h-auto max-h-[600px] mx-auto block" : "w-full h-auto block"}
                      loading="lazy"
                    />
                    <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition">
                      <Search className="w-2.5 h-2.5" /> Zoom
                    </span>
                  </button>
                  <figcaption className="text-[11px] leading-snug text-text-secondary text-center">
                    {img.alt}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center select-none"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <div
            className="relative flex-1 w-full flex items-center justify-center overflow-hidden touch-none"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={() => (scale === 1 ? setScale(2.5) : resetZoom())}
            style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              draggable={false}
              className="max-w-[95vw] max-h-[85vh] object-contain transition-transform duration-75"
              style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
            />
          </div>
          <div className="shrink-0 pb-4 pt-2 flex items-center gap-4 text-white/70 text-xs font-mono" onClick={(e) => e.stopPropagation()}>
            <span>{lightbox.alt}</span>
            <span className="hidden sm:inline">· scroll or double-click to zoom</span>
            <span className="sm:hidden">· pinch to zoom</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white text-2xl hover:opacity-80 w-10 h-10 flex items-center justify-center rounded-full bg-black/40"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
