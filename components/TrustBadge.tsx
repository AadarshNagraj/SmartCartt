"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function TrustBadge({ icon, title, description, className }: TrustBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold leading-none mb-1">{title}</h4>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
