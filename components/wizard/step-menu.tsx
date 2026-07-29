'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'
import { MENUS } from '@/lib/options'
import { cn } from '@/lib/utils'
import type { EventState } from '@/types'

interface Props {
  state: EventState
  update: (patch: Partial<EventState>) => void
}

export function StepMenu({ state, update }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {MENUS.map((menu) => {
        const selected = state.menu === menu.nombre
        return (
          <button
            key={menu.nombre}
            type="button"
            onClick={() => update({ menu: menu.nombre })}
            className={cn(
              'group relative overflow-hidden rounded-2xl border text-left transition-all duration-200',
              selected
                ? 'border-primary shadow-[0_0_0_1px_var(--color-primary),0_18px_40px_-20px_rgba(0,0,0,0.8)]'
                : 'border-border hover:border-primary/50',
            )}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={menu.imagen || '/placeholder.svg'}
                alt={menu.nombre}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              {selected && (
                <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" strokeWidth={3} />
                </span>
              )}
            </div>
            <div className="space-y-1.5 p-5">
              <h3 className="font-serif text-xl text-foreground">{menu.nombre}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{menu.descripcion}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
