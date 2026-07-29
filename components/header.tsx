import { Flame } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 text-primary">
            <Flame className="size-4.5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-foreground">
              Asados Gourmet
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary">
              Eventos Premium
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <span className="transition-colors hover:text-foreground">Menús</span>
          <span className="transition-colors hover:text-foreground">Servicios</span>
          <span className="transition-colors hover:text-foreground">Contacto</span>
        </nav>
      </div>
    </header>
  )
}
