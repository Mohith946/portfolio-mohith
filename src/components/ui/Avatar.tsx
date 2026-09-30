import Image from "next/image";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/site";

/** Profile photo, or an initial monogram when public/profile.jpg doesn't exist yet. */
export function Avatar({ show, size = 28 }: { show: boolean; size?: number }) {
  const classes = "shrink-0 rounded-full border border-border-strong";

  if (!show) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size }}
        className={cn(
          classes,
          "grid place-items-center bg-accent-soft font-serif text-accent italic",
        )}
      >
        {profile.shortName[0]}
      </span>
    );
  }

  return (
    <Image
      src={profile.avatar}
      alt={`Photo of ${profile.name}`}
      width={size}
      height={size}
      className={cn(classes, "object-cover")}
      priority
    />
  );
}
