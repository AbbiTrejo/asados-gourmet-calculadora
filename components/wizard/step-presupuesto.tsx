'use client'

import type { EventState } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

const MIN = 5000
const MAX = 100000

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function StepPresupuesto({ state, update }: Props) {
  const value = state.presupuesto || MIN
  const percent = ((value - MIN) / (MAX - MIN)) * 100

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Presupuesto estimado
        </span>
        <span className="font-serif text-5xl text-primary">{currency.format(value)}</span>
        <span className="text-sm text-muted-foreground">
          {value >= MAX ? 'o más' : 'aproximadamente'}
        </span>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={1000}
          value={value}
          onChange={(e) => update({ presupuesto: Number(e.target.value) })}
          className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-primary"
          style={{
            background: `linear-gradient(to right, var(--color-primary) ${percent}%, var(--color-secondary) ${percent}%)`,
          }}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{currency.format(MIN)}</span>
          <span>{currency.format(MAX)}+</span>
        </div>
      </div>
    </div>
  )
}
