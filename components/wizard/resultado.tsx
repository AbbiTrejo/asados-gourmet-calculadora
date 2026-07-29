'use client'

import {
  Beef,
  Clock,
  Drumstick,
  Flame,
  GlassWater,
  Snowflake,
  Sparkles,
  Users,
  Wine,
} from 'lucide-react'
import type { CalculationResult } from '@/types'

interface Props {
  result: CalculationResult
}

const currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function Resultado({ result }: Props) {
  const stats = [
    { icon: Beef, label: 'Carne (cortes)', value: `${result.carneKg} kg` },
    { icon: Drumstick, label: 'Pollo', value: result.polloKg > 0 ? `${result.polloKg} kg` : '—' },
    { icon: Flame, label: 'Chorizo', value: result.chorizoKg > 0 ? `${result.chorizoKg} kg` : '—' },
    { icon: GlassWater, label: 'Bebidas', value: `${result.bebidasLitros} L` },
    { icon: Snowflake, label: 'Hielo', value: `${result.hieloKg} kg` },
    {
      icon: Wine,
      label: 'Vino',
      value: result.vinoBotellas > 0 ? `${result.vinoBotellas} botellas` : '—',
    },
    { icon: Users, label: 'Meseros sugeridos', value: `${result.meseros}` },
    { icon: Clock, label: 'Duración estimada', value: `${result.duracionHoras} h` },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">Tu recomendación</span>
        <h2 className="mt-2 font-serif text-4xl text-foreground text-balance">
          Esto es lo que tu evento necesita
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-5 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <s.icon className="size-5" />
            </span>
            <span className="font-serif text-2xl text-foreground">{s.value}</span>
            <span className="text-xs leading-tight text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary">Costo estimado</span>
        <span className="font-serif text-5xl text-foreground">
          {currency.format(result.costoEstimado)}
        </span>
        <span className="text-sm text-muted-foreground">
          Cotización aproximada · sujeta a confirmación
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-serif text-xl text-foreground">
          <Sparkles className="size-5 text-primary" />
          Recomendaciones del chef
        </h3>
        <ul className="space-y-2.5">
          {result.recomendaciones.map((rec, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
