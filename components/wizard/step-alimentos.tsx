'use client'

import { OptionToggle } from '@/components/option-toggle'
import { ALIMENTOS } from '@/lib/options'
import type { EventState } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

export function StepAlimentos({ state, update }: Props) {
  const toggle = (item: string) => {
    const next = state.alimentos.includes(item)
      ? state.alimentos.filter((a) => a !== item)
      : [...state.alimentos, item]
    update({ alimentos: next })
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ALIMENTOS.map((item) => (
        <OptionToggle
          key={item}
          label={item}
          selected={state.alimentos.includes(item)}
          onToggle={() => toggle(item)}
        />
      ))}
    </div>
  )
}
