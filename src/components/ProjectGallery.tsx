import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/** Screenshot grid with a click-to-enlarge lightbox (arrow keys navigate). */
export function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-[hsl(var(--soft))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Enlarge ${title} screenshot ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-[calc(100%-1.5rem)] gap-3 border-white/10 bg-[hsl(var(--navy-deep))] p-3 text-white sm:max-w-6xl sm:p-4">
          <DialogTitle className="pr-8 text-sm font-semibold text-white/80">
            {title} · {(active ?? 0) + 1} / {images.length}
          </DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys to move between screenshots.</DialogDescription>
          {active !== null && (
            <div className="relative">
              <img
                src={images[active]}
                alt={`${title} screenshot ${active + 1}`}
                className="max-h-[78vh] w-full rounded-lg object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-accent hover:text-[#06202E]"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-accent hover:text-[#06202E]"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
