import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Wizard } from '@/components/wizard/wizard'

export default function CalculadoraPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-5 py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">
            Calculadora de eventos
          </span>
          <h1 className="mt-2 font-serif text-4xl text-foreground text-balance sm:text-5xl">
            Diseña tu asado gourmet
          </h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Completa los pasos y obtén tu recomendación personalizada al instante.
          </p>
        </div>
        <Wizard />
      </main>
      <Footer />
    </div>
  )
}
