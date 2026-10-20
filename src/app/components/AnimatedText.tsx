"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType = "wave" | "fadeUp" | "typewriter" | "bounce";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  /** ms before first character appears */
  delay?: number;
  /** ms between each word */
  stagger?: number;
  animation?: AnimationType;
  style?: React.CSSProperties;
}

/**
 * Splits text by WORD (not character) to preserve natural line-wrapping,
 * then animates each word in with a staggered delay.
 * Uses IntersectionObserver so animation fires when element scrolls into view.
 */
export default function AnimatedText({
  text,
  className = "",
  tag: Tag = "span",
  delay = 0,
  stagger = 80,
  animation = "wave",
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split by word, keeping spaces as separate tokens so spacing is preserved
  const words = text.split(" ");

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={{ ...style, display: "block" }} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: triggered ? undefined : 0,
            animation: triggered
              ? `anim-${animation} 0.55s cubic-bezier(0.215,0.61,0.355,1) ${delay + i * stagger}ms both`
              : "none",
            marginRight: i < words.length - 1 ? "0.28em" : 0,
            willChange: "transform, opacity",
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
