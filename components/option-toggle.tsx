'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OptionToggleProps {
  label: string
  selected: boolean
  onToggle: () => void
  type?: 'checkbox' | 'radio'
}

export function OptionToggle({ label, selected, onToggle, type = 'checkbox' }: OptionToggleProps) {
  return (
    <button
      type="button"
      role={type === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        'group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200',
        selected
          ? 'border-primary/70 bg-primary/10 shadow-[0_0_0_1px_var(--color-primary)]'
          : 'border-border bg-card hover:border-primary/40 hover:bg-secondary',
      )}
    >
      <span
        className={cn(
          'flex size-5 shrink-0 items-center justify-center border transition-colors',
          type === 'radio' ? 'rounded-full' : 'rounded-md',
          selected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/50',
        )}
      >
        {selected &&
          (type === 'radio' ? (
            <span className="size-2 rounded-full bg-primary-foreground" />
          ) : (
            <Check className="size-3.5" strokeWidth={3} />
          ))}
      </span>
      <span
        className={cn(
          'text-sm leading-snug transition-colors',
          selected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
        )}
      >
        {label}
      </span>
    </button>
  )
}
