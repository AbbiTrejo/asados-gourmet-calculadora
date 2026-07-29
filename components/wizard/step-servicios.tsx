'use client'

import { OptionToggle } from '@/components/option-toggle'
import { SERVICIOS } from '@/lib/options'
import type { EventState } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

export function StepServicios({ state, update }: Props) {
  const toggle = (item: string) => {
    const next = state.servicios.includes(item)
      ? state.servicios.filter((s) => s !== item)
      : [...state.servicios, item]
    update({ servicios: next })
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICIOS.map((item) => (
        <OptionToggle
          key={item}
          label={item}
          selected={state.servicios.includes(item)}
          onToggle={() => toggle(item)}
        />
      ))}
    </div>
  )
}
