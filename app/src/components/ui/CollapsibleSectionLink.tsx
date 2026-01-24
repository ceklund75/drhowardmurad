"use client";

import * as React from "react";
import { cx } from "@/lib/ui";

type Props = {
  defaultOpen?: boolean;
  className?: string;
  contentId?: string;
  children: React.ReactNode;

  moreLabel?: string; // default: "MORE"
  lessLabel?: string; // default: "LESS"
};

export function CollapsibleSectionLink({
  defaultOpen = false,
  className,
  contentId,
  children,
  moreLabel = "MORE",
  lessLabel = "LESS",
}: Props) {
  const reactId = React.useId();
  const panelId = contentId ?? `collapsible-${reactId}`;
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        className={cx(
          "w-full text-left",
          "text-link hover:text-link-hover",
          "text-button font-medium uppercase tracking-wide",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2"
        )}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? lessLabel : moreLabel}
      </button>

      <div id={panelId} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
