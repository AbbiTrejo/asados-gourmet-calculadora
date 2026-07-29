import { Flame } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-12 text-center">
        <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 text-primary">
          <Flame className="size-5" />
        </span>
        <p className="font-serif text-xl text-foreground">Asados Gourmet</p>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Experiencias de parrilla gourmet para eventos inolvidables. Cortes premium, servicio
          impecable y maridajes cuidadosamente seleccionados.
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
          © {new Date().getFullYear()} Asados Gourmet · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
