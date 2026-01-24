"use client";

import React from "react";
import { useState, useEffect } from "react";
import { cx } from "@/lib/ui";

export function HeaderShell({
  children,
  className,
  shrinkAt = 10,
}: {
  children: React.ReactNode;
  className?: string;
  shrinkAt?: number;
}) {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > shrinkAt);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shrinkAt]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 group bg-linear-to-r from-gradient-purple to-gradient-pink",
        className
      )}
      data-shrunk={shrunk ? "true" : "false"}
    >
      {children}
    </header>
  );
}
