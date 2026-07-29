'use client'

import { HORARIOS, TIPOS_EVENTO } from '@/lib/options'
import { cn } from '@/lib/utils'
import type { EventState, Horario } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

export function StepEvento({ state, update }: Props) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Tipo de evento</label>
        <div className="flex flex-wrap gap-2.5">
          {TIPOS_EVENTO.map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => update({ tipoEvento: tipo })}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-all',
                state.tipoEvento === tipo
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="invitados" className="text-sm font-medium text-foreground">
            Número de invitados
          </label>
          <input
            id="invitados"
            type="number"
            min={1}
            value={state.invitados || ''}
            onChange={(e) => update({ invitados: Number(e.target.value) })}
            placeholder="Ej. 50"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="fecha" className="text-sm font-medium text-foreground">
            Fecha del evento
          </label>
          <input
            id="fecha"
            type="date"
            value={state.fecha}
            onChange={(e) => update({ fecha: e.target.value })}
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors [color-scheme:dark] focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Horario</label>
        <div className="grid grid-cols-3 gap-2.5">
          {HORARIOS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => update({ horario: h as Horario })}
              className={cn(
                'rounded-xl border px-4 py-3 text-sm transition-all',
                state.horario === h
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {h}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
