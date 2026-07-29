'use client'

import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { calculate } from '@/lib/calculator'
import { STEP_TITLES } from '@/lib/options'
import { cn } from '@/lib/utils'
import type { CalculationResult, EventState } from '@/types'
import { LeadForm } from './lead-form'
import { Resultado } from './resultado'
import { StepAlimentos } from './step-alimentos'
import { StepBebidas } from './step-bebidas'
import { StepEvento } from './step-evento'
import { StepMenu } from './step-menu'
import { StepPresupuesto } from './step-presupuesto'
import { StepServicios } from './step-servicios'

const INITIAL: EventState = {
  tipoEvento: '',
  invitados: 0,
  fecha: '',
  horario: '',
  menu: '',
  alimentos: [],
  bebidas: [],
  tipoVino: '',
  botellasVino: 0,
  servicios: [],
  presupuesto: 5000,
}

export function Wizard() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<EventState>(INITIAL)
  const [result, setResult] = useState<CalculationResult | null>(null)

  const update = (patch: Partial<EventState>) => setState((prev) => ({ ...prev, ...patch }))

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(state.tipoEvento && state.invitados > 0 && state.fecha && state.horario)
      case 1:
        return Boolean(state.menu)
      case 2:
        return state.alimentos.length > 0
      case 3:
        return state.bebidas.length > 0
      case 4:
        return true
      case 5:
        return state.presupuesto > 0
      default:
        return true
    }
  }, [step, state])

  const handleCalculate = () => {
    setResult(calculate(state))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setState(INITIAL)
    setStep(0)
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl space-y-10">
        <div className="animate-in fade-in slide-in-from-bottom-3">
          <Resultado result={result} />
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <LeadForm state={state} result={result} />
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" onClick={reset} className="gap-2 text-muted-foreground">
            <RotateCcw className="size-4" />
            Calcular otro evento
          </Button>
        </div>
      </div>
    )
  }

  const isLast = step === STEP_TITLES.length - 1

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary">
            Paso {step + 1} <span className="text-muted-foreground">de {STEP_TITLES.length}</span>
          </span>
          <span className="text-muted-foreground">
            {Math.round(((step + 1) / STEP_TITLES.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / STEP_TITLES.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card/40 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-8">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">
            {`0${step + 1}`.slice(-2)}
          </span>
          <h2 className="mt-1 font-serif text-3xl text-foreground text-balance">
            {STEP_TITLES[step]}
          </h2>
        </div>

        <div key={step} className="animate-in fade-in slide-in-from-right-3 duration-300">
          {step === 0 && <StepEvento state={state} update={update} />}
          {step === 1 && <StepMenu state={state} update={update} />}
          {step === 2 && <StepAlimentos state={state} update={update} />}
          {step === 3 && <StepBebidas state={state} update={update} />}
          {step === 4 && <StepServicios state={state} update={update} />}
          {step === 5 && <StepPresupuesto state={state} update={update} />}
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={cn('gap-2', step === 0 && 'invisible')}
          >
            <ArrowLeft className="size-4" />
            Atrás
          </Button>

          {isLast ? (
            <Button
              size="lg"
              onClick={handleCalculate}
              disabled={!stepValid}
              className="h-12 gap-2 rounded-full px-8 text-base"
            >
              <Sparkles className="size-4" />
              Calcular
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => setStep((s) => s + 1)}
              disabled={!stepValid}
              className="h-12 gap-2 rounded-full px-8 text-base"
            >
              Continuar
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
