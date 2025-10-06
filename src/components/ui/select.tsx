import { useId, useState } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const id = useId();
  return (
    <div data-select-id={id} className="relative">
      {children instanceof Array
        ? children.map((child) =>
            // @ts-expect-error internal clone
            child.type && child.type.__selectTrigger
              ? { ...child, props: { ...child.props, value, onValueChange } }
              : child
          )
        : children}
    </div>
  );
}

interface TriggerProps {
  className?: string;
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (v: string) => void;
}

export function SelectTrigger({ className, value, onValueChange, children }: TriggerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className={`inline-flex items-center justify-between rounded-md border bg-background px-3 py-2 ${className ?? ''}`}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span>{children || value}</span>
        <svg className="ml-2 h-4 w-4 opacity-70" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-1 shadow-md">
          {/* portal simulated by sibling */}
          {/* The content is provided below via SelectContent */}
        </div>
      )}
    </div>
  );
}
// mark
SelectTrigger.__selectTrigger = true;

export function SelectContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function SelectItem({ value, children, onSelect }: { value: string; children: React.ReactNode; onSelect?: (v: string) => void }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm hover:bg-secondary"
      onClick={() => onSelect?.(value)}
    >
      {children}
    </button>
  );
}

export function SelectValue() {
  return null;
}


