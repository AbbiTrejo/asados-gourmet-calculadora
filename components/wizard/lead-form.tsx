'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { saveLead } from '@/lib/supabase'
import type { CalculationResult, EventState } from '@/types'

interface Props {
  state: EventState
  result: CalculationResult
}

const BENEFITS = [
  'Cotización detallada',
  'Menú personalizado',
  'Recomendación de vinos',
  'Cronograma del evento',
  'Promociones exclusivas',
]

export function LeadForm({ state, result }: Props) {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    empresa: '',
    comentarios: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const valid = form.nombre.trim() && form.correo.trim() && form.telefono.trim()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setStatus('loading')
    await saveLead({
      ...form,
      tipoEvento: state.tipoEvento,
      invitados: state.invitados,
      fecha: state.fecha,
      horario: state.horario,
      menu: state.menu,
      alimentos: state.alimentos,
      bebidas: state.bebidas,
      servicios: state.servicios,
      presupuesto: state.presupuesto,
      resultadoCalculado: result,
    })
    setStatus('done')
  }

  const inputClass =
    'w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary'

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/40 bg-primary/10 p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="font-serif text-3xl text-foreground">¡Gracias, {form.nombre}!</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Hemos recibido tu solicitud. Nuestro equipo preparará una propuesta personalizada y te
          contactará muy pronto al correo <span className="text-primary">{form.correo}</span>.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent">
      <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
        <div className="space-y-5">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Sin costo</span>
          <h3 className="font-serif text-3xl text-foreground text-balance">
            Recibe una propuesta personalizada
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Obtén gratuitamente todo lo que necesitas para organizar tu evento perfecto:
          </p>
          <ul className="space-y-2.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="size-4.5 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <input
            required
            value={form.nombre}
            onChange={set('nombre')}
            placeholder="Nombre *"
            className={inputClass}
          />
          <input
            required
            type="email"
            value={form.correo}
            onChange={set('correo')}
            placeholder="Correo *"
            className={inputClass}
          />
          <input
            required
            type="tel"
            value={form.telefono}
            onChange={set('telefono')}
            placeholder="Teléfono *"
            className={inputClass}
          />
          <input
            value={form.empresa}
            onChange={set('empresa')}
            placeholder="Empresa (opcional)"
            className={inputClass}
          />
          <textarea
            value={form.comentarios}
            onChange={set('comentarios')}
            placeholder="Comentarios"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          <Button
            type="submit"
            size="lg"
            disabled={!valid || status === 'loading'}
            className="h-12 w-full rounded-full text-base"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Recibir mi propuesta'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
