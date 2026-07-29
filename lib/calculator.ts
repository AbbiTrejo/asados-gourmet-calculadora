import type { CalculationResult, EventState } from '@/types'

const MENU_MULTIPLIER: Record<string, number> = {
  'Parrillada Tradicional': 1,
  'Parrillada Premium': 1.25,
  'Parrillada Argentina': 1.15,
  'Parrillada Norteña': 1.1,
  'Menú Personalizado': 1.2,
}

const MENU_COST_PER_GUEST: Record<string, number> = {
  'Parrillada Tradicional': 420,
  'Parrillada Premium': 780,
  'Parrillada Argentina': 640,
  'Parrillada Norteña': 520,
  'Menú Personalizado': 700,
}

// Approximate cost per person for each additional service
const SERVICE_COST: Record<string, number> = {
  'Chef Parrillero': 90,
  Meseros: 70,
  Bartender: 60,
  'Música Ambiental': 25,
  DJ: 80,
  Mobiliario: 110,
  Cristalería: 30,
  Loza: 30,
  Carpa: 130,
  Decoración: 90,
  Pantallas: 60,
  'Generador eléctrico': 40,
}

function round(n: number, step = 0.5) {
  return Math.round(n / step) * step
}

export function calculate(state: EventState): CalculationResult {
  const guests = Math.max(1, state.invitados || 1)
  const menuMult = MENU_MULTIPLIER[state.menu] ?? 1

  const hasPollo = state.alimentos.includes('Pollo')
  const hasChorizo = state.alimentos.includes('Chorizo Argentino')

  // Base ~0.35 kg red meat per guest, adjusted by menu tier
  const carneKg = round(guests * 0.35 * menuMult, 0.5)
  const polloKg = hasPollo ? round(guests * 0.2, 0.5) : 0
  const chorizoKg = hasChorizo ? round(guests * 0.12, 0.5) : 0

  // Drinks: ~1.5 L per guest for daytime, more for cena/parties
  const drinkFactor = state.horario === 'Cena' ? 2 : state.horario === 'Comida' ? 1.6 : 1.2
  const bebidasLitros = round(guests * drinkFactor, 1)

  // Ice: ~0.8 kg per guest when drinks selected
  const hieloKg = round(guests * 0.8, 1)

  // Wine bottles
  const vinoBotellas = state.bebidas.includes('Vinos')
    ? state.botellasVino > 0
      ? state.botellasVino
      : Math.ceil(guests / 4)
    : 0

  // Waiters: 1 per 20 guests, min depends on service selection
  const wantsMeseros = state.servicios.includes('Meseros')
  const meseros = wantsMeseros ? Math.max(2, Math.ceil(guests / 20)) : Math.ceil(guests / 30)

  // Event duration
  const duracionHoras = state.horario === 'Cena' ? 5 : state.horario === 'Comida' ? 4 : 3

  // Cost
  const perGuest = MENU_COST_PER_GUEST[state.menu] ?? 500
  const servicesCost = state.servicios.reduce(
    (acc, s) => acc + (SERVICE_COST[s] ?? 0) * guests,
    0,
  )
  const vinoCost = vinoBotellas * 450
  const costoEstimado = Math.round(perGuest * guests + servicesCost + vinoCost)

  return {
    carneKg,
    polloKg,
    chorizoKg,
    bebidasLitros,
    hieloKg,
    vinoBotellas,
    meseros,
    duracionHoras,
    costoEstimado,
    recomendaciones: buildRecommendations(state),
  }
}

function buildRecommendations(state: EventState): string[] {
  const recs: string[] = []

  if (state.menu === 'Parrillada Premium' || state.alimentos.includes('Rib Eye')) {
    recs.push(
      'Para acompañar los cortes premium recomendamos un vino tinto Cabernet Sauvignon de cuerpo robusto.',
    )
  }

  if (state.menu === 'Parrillada Argentina') {
    recs.push(
      'La parrillada argentina marida perfecto con un Malbec mendocino y una salsa chimichurri de la casa.',
    )
  }

  if (state.tipoEvento === 'Evento empresarial') {
    recs.push(
      'Para un evento empresarial recomendamos incluir bartender y una barra de vinos para una experiencia más sofisticada.',
    )
  }

  if (state.tipoEvento === 'Boda' || state.tipoEvento === 'XV años') {
    recs.push(
      'Para esta celebración sugerimos coctelería de bienvenida y un DJ para mantener el ambiente durante toda la noche.',
    )
  }

  if (state.invitados >= 80) {
    recs.push(
      'Con más de 80 invitados recomendamos duplicar el servicio de meseros y agregar un segundo chef parrillero para agilizar los tiempos.',
    )
  }

  if (state.bebidas.includes('Vinos') && state.tipoVino === 'Blanco') {
    recs.push(
      'Un vino blanco Sauvignon Blanc frío resaltará los cortes de pollo y los vegetales asados.',
    )
  }

  if (state.horario === 'Cena') {
    recs.push(
      'Para una cena sugerimos iluminación cálida, música ambiental y una barra de postres para cerrar la velada.',
    )
  }

  if (recs.length === 0) {
    recs.push(
      'Recomendamos una selección balanceada de cortes con guarniciones frescas y una barra de bebidas variada para tus invitados.',
    )
  }

  return recs
}
