"use client";

import { Popover } from "radix-ui";

const PopoverRoot = Popover.Root;
const PopoverTrigger = Popover.Trigger;
const PopoverAnchor = Popover.Anchor;

function PopoverContent({
  className,
  align = "end",
  sideOffset = 8,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popover.Content> & { className?: string }) {
  return (
    <Popover.Portal>
      <Popover.Content
        align={align}
        sideOffset={sideOffset}
        className={[
          "z-[var(--z-popover)] w-64 rounded-xl border border-[var(--glass-border)] p-2",
          "bg-[var(--background)]/90 backdrop-blur-[var(--glass-blur)]",
          "[box-shadow:var(--glass-shadow)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          className ?? "",
        ]
          .join(" ")
          .trim()}
        {...props}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
}

export { PopoverRoot, PopoverTrigger, PopoverAnchor, PopoverContent };
