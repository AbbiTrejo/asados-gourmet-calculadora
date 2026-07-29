'use client'

import { OptionToggle } from '@/components/option-toggle'
import { BEBIDAS, TIPOS_VINO } from '@/lib/options'
import type { EventState, TipoVino } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

export function StepBebidas({ state, update }: Props) {
  const toggle = (item: string) => {
    const next = state.bebidas.includes(item)
      ? state.bebidas.filter((b) => b !== item)
      : [...state.bebidas, item]
    update({ bebidas: next })
  }

  const showVino = state.bebidas.includes('Vinos')

  return (
    <div className="space-y-8">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {BEBIDAS.map((item) => (
          <OptionToggle
            key={item}
            label={item}
            selected={state.bebidas.includes(item)}
            onToggle={() => toggle(item)}
          />
        ))}
      </div>

      {showVino && (
        <div className="animate-in fade-in slide-in-from-top-2 space-y-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Tipo de vino</label>
            <div className="flex flex-wrap gap-2.5">
              {TIPOS_VINO.map((tipo) => (
                <OptionToggle
                  key={tipo}
                  type="radio"
                  label={tipo}
                  selected={state.tipoVino === tipo}
                  onToggle={() => update({ tipoVino: tipo as TipoVino })}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="botellas" className="text-sm font-medium text-foreground">
              Cantidad aproximada de botellas
            </label>
            <input
              id="botellas"
              type="number"
              min={0}
              value={state.botellasVino || ''}
              onChange={(e) => update({ botellasVino: Number(e.target.value) })}
              placeholder="Ej. 12"
              className="w-full max-w-xs rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>
        </div>
      )}
    </div>
  )
}
