"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RedlineRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function RedlineReveal({ children, as = "span", className = "" }: RedlineRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = as as "span";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { backgroundSize: "0% 2px" },
        {
          backgroundSize: "100% 2px",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, el);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const style: CSSProperties = {
    backgroundImage: "linear-gradient(var(--citation-500), var(--citation-500))",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%",
    backgroundSize: "0% 2px",
    paddingBottom: "0.15em",
  };

  return (
    <Component
      ref={ref as React.Ref<HTMLSpanElement>}
      className={`redline-target ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
