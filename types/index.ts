export type Horario = 'Desayuno' | 'Comida' | 'Cena'

export type TipoVino = 'Tinto' | 'Blanco' | 'Rosado' | 'Espumoso'

export interface EventoData {
  tipoEvento: string
  invitados: number
  fecha: string
  horario: Horario | ''
}

export interface EventState {
  // Paso 1
  tipoEvento: string
  invitados: number
  fecha: string
  horario: Horario | ''
  // Paso 2
  menu: string
  // Paso 3
  alimentos: string[]
  // Paso 4
  bebidas: string[]
  tipoVino: TipoVino | ''
  botellasVino: number
  // Paso 5
  servicios: string[]
  // Paso 6
  presupuesto: number
}

export interface CalculationResult {
  carneKg: number
  polloKg: number
  chorizoKg: number
  bebidasLitros: number
  hieloKg: number
  vinoBotellas: number
  meseros: number
  duracionHoras: number
  costoEstimado: number
  recomendaciones: string[]
}

export interface LeadData {
  nombre: string
  correo: string
  telefono: string
  empresa?: string
  comentarios?: string
  tipoEvento: string
  invitados: number
  fecha: string
  horario: string
  menu: string
  alimentos: string[]
  bebidas: string[]
  servicios: string[]
  presupuesto: number
  resultadoCalculado: CalculationResult
}
