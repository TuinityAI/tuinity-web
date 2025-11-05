import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';

interface Props {
  expanded?: boolean;
  collapsed?: boolean;
  on?: boolean;
  open?: boolean;
  groupHover?: boolean;
  groupHoverExpanded?: boolean;
  groupHoverCollapsed?: boolean;
  hoverCollapsed?: boolean;
  mobileExpanded?: boolean;
  mobileCollapsed?: boolean;
  smExpanded?: boolean;
  smCollapsed?: boolean;
  mdExpanded?: boolean;
  mdCollapsed?: boolean;
  lgExpanded?: boolean;
  lgCollapsed?: boolean;
  focusExpanded?: boolean;
  dir?: 'x' | 'y';
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  props?: React.HTMLProps<HTMLDivElement>;
}

export function Collapsible({
  children,
  className,
  asChild,
  dir = 'x',
  on,
  open = on,
  collapsed,
  expanded = open,
  groupHover,
  groupHoverExpanded = groupHover,
  groupHoverCollapsed = false,
  hoverCollapsed = false,
  mobileExpanded = false,
  mobileCollapsed = false,
  smExpanded = mobileExpanded,
  smCollapsed = mobileCollapsed,
  mdExpanded = false,
  mdCollapsed = false,
  lgExpanded = false,
  lgCollapsed = false,
  focusExpanded = true,
  props,
}: Props) {
  const Comp = asChild ? Slot : 'div';
  const x = dir === 'x';
  if (collapsed !== undefined) expanded ??= !collapsed;
  return (
    <div
      className={cn(
        'items-center content-center grid w-fit overflow-hidden duration-300 delay-0',
        x ? 'grid-cols-[0fr]' : 'grid-rows-[0fr]',
        expanded && (x ? 'grid-cols-[1fr]' : 'grid-rows-[1fr]'),
        focusExpanded && (x ? 'focus-within:grid-cols-[1fr]' : 'focus-within:grid-rows-[1fr]'),
        groupHoverExpanded && (x ? 'group-hover:grid-cols-[1fr]' : 'group-hover:grid-rows-[1fr]'),
        groupHoverCollapsed &&
          (x ? 'grid-cols-[1fr] group-hover:grid-cols-[0fr]' : 'grid-rows-[1fr] group-hover:grid-rows-[0fr]'),
        hoverCollapsed && (x ? 'grid-cols-[1fr] hover:grid-cols-[0fr]' : 'grid-rows-[1fr] hover:grid-rows-[0fr]'),
        smExpanded && (x ? 'max-sm:grid-cols-[1fr]' : 'max-sm:grid-rows-[1fr]'),
        smCollapsed && (x ? 'sm:grid-cols-[1fr]' : 'sm:grid-rows-[1fr]'),
        mdExpanded && (x ? 'max-md:grid-cols-[1fr]' : 'max-md:grid-rows-[1fr]'),
        mdCollapsed && (x ? 'md:grid-cols-[1fr]' : 'md:grid-rows-[1fr]'),
        lgExpanded && (x ? 'max-lg:grid-cols-[1fr]' : 'max-lg:grid-rows-[1fr]'),
        lgCollapsed && (x ? 'lg:grid-cols-[1fr]' : 'lg:grid-rows-[1fr]'),
        className,
      )}
    >
      <Comp {...props} className={cn('overflow-hidden', props?.className)}>
        {children}
      </Comp>
    </div>
  );
}

export const Coll = Collapsible;
export const Expandable = Collapsible;
export const C = Collapsible;
export default C;
