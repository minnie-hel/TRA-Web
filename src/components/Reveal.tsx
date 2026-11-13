import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function RevealStagger({
  children,
  className = "",
  step = 90,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  as?: "div" | "ul" | "ol";
}) {
  return (
    <Tag className={className}>
      {Children.map(children, (child, index) =>
        isValidElement(child) ? (
          <Reveal key={child.key ?? index} delay={index * step} as="div" className="h-full">
            {child}
          </Reveal>
        ) : null,
      )}
    </Tag>
  );
}
