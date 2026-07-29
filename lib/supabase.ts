import type { LeadData } from '@/types'

/**
 * saveLead — Placeholder para la futura integración con Supabase.
 *
 * Cuando se conecte Supabase, esta función deberá:
 *   1. Crear el cliente con las variables de entorno
 *      (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).
 *   2. Insertar el lead en la tabla `leads`.
 *   3. Devolver el registro creado o el error.
 *
 * Ejemplo (a implementar más adelante):
 *   const supabase = createClient(url, anonKey)
 *   const { data, error } = await supabase.from('leads').insert(lead)
 *
 * Por ahora solo simula el guardado y registra los datos en consola.
 */
export async function saveLead(lead: LeadData): Promise<{ success: boolean }> {
  console.log('[v0] saveLead (placeholder) - lead recibido:', lead)

  // Simula latencia de red
  await new Promise((resolve) => setTimeout(resolve, 900))

  // TODO: reemplazar por la inserción real en Supabase.
  return { success: true }
}
