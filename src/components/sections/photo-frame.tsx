import { Heart } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  imageUrl: string;
  caption: string;
  rotate?: number;
  className?: string;
  onClick?: () => void;
};

export function PhotoFrame({
  imageUrl,
  caption,
  rotate = 0,
  className,
  onClick,
}: PhotoFrameProps) {
  return (
    <figure
      className={cn(
        "relative rounded-sm bg-white p-3 pb-9 shadow-lg ring-1 ring-primary/10",
        onClick && "cursor-pointer transition-transform duration-200 hover:scale-[1.03]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <span
        className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 rounded-[1px] bg-accent/70 shadow-sm"
        aria-hidden="true"
      />

      <Heart
        className="absolute -top-2 -right-2 size-5 rotate-12 text-primary drop-shadow-sm"
        fill="currentColor"
        aria-hidden="true"
      />

      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={caption}
          fill
          sizes="(min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
    </figure>
  );
}
