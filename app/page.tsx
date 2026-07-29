import { ArrowRight, Calculator, ChefHat, Wine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    icon: Calculator,
    title: 'Cálculo inteligente',
    desc: 'Calcula automáticamente carne, bebidas, hielo y servicios según tus invitados.',
  },
  {
    icon: ChefHat,
    title: 'Menús gourmet',
    desc: 'Parrilladas premium con cortes selectos y opciones totalmente personalizables.',
  },
  {
    icon: Wine,
    title: 'Maridaje experto',
    desc: 'Recomendaciones de vinos y coctelería para elevar cada momento de tu evento.',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-asado.png"
              alt="Parrilla gourmet con cortes premium"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
          </div>

          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center sm:py-36">
            <span className="mb-6 rounded-full border border-primary/40 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              Calculadora Inteligente para Eventos
            </span>
            <h1 className="font-serif text-5xl leading-[1.05] text-foreground text-balance sm:text-7xl">
              Asados Gourmet para eventos inolvidables
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Organiza tu evento y descubre en segundos cuánta comida, bebida y servicio necesitas.
              Sin registros. Primero el resultado, después la propuesta.
            </p>
            <Link href="/calculadora" className="mt-9">
              <Button size="lg" className="h-13 gap-2 rounded-full px-8 text-base">
                Comenzar a calcular
                <ArrowRight className="size-4.5" />
              </Button>
            </Link>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              Gratis · Sin compromiso
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.9)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <f.icon className="size-6" />
                </span>
                <h3 className="font-serif text-2xl text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-12 text-center">
            <h2 className="max-w-2xl font-serif text-4xl text-foreground text-balance sm:text-5xl">
              Tu próximo evento empieza con un solo clic
            </h2>
            <p className="max-w-lg text-muted-foreground text-pretty">
              Responde unas preguntas rápidas y recibe una recomendación completa con cotización
              estimada al instante.
            </p>
            <Link href="/calculadora">
              <Button size="lg" className="h-13 gap-2 rounded-full px-8 text-base">
                Crear mi cotización
                <ArrowRight className="size-4.5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
