import type { ReactNode } from "react";

export function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-navy">
      {children}
    </label>
  );
}

export function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mt-1 text-sm text-red-800" role="alert">
      {children}
    </p>
  );
}

export function FormNote({ children }: { children: ReactNode }) {
  return <p className="card-callout px-4 py-3 text-sm leading-relaxed text-navy">{children}</p>;
}

export function SuccessPanel({
  title,
  body,
  again,
  onAgain,
}: {
  title: string;
  body: string;
  again: string;
  onAgain: () => void;
}) {
  return (
    <div className="card card-accent-green px-5 py-6" role="status">
      <h3 className="font-display text-2xl text-navy">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{body}</p>
      <button
        type="button"
        onClick={onAgain}
        className="mt-5 text-sm font-medium text-navy underline decoration-green decoration-2 underline-offset-[6px]"
      >
        {again}
      </button>
    </div>
  );
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return emailPattern.test(value.trim());
}
