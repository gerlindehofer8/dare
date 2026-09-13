import { supabase } from '../lib/supabase'
import type { Dare } from '../types'

type CloudDare = { id: string; text: string; category: Dare['category']; spice_level: Dare['spiceLevel']; target: Dare['target']; duration: number | null; description: string | null; is_special: boolean; active: boolean }

async function currentUserId() {
  if (!supabase) return null
  const existing = await supabase.auth.getUser()
  if (existing.data.user) return existing.data.user.id
  const signedIn = await supabase.auth.signInAnonymously()
  return signedIn.data.user?.id ?? null
}
const fromCloud = (dare: CloudDare): Dare => ({ id: dare.id, text: dare.text, category: dare.category, spiceLevel: dare.spice_level, target: dare.target, duration: dare.duration ?? undefined, description: dare.description ?? undefined, isTimer: Boolean(dare.duration), isSpecial: dare.is_special, spiceValue: dare.spice_level * 3 + (dare.is_special ? 3 : 0), isCustom: true, active: dare.active })

export async function fetchCloudDares(): Promise<Dare[] | null> {
  const ownerId = await currentUserId()
  if (!supabase || !ownerId) return null
  const result = await supabase.from('custom_dares').select('id,text,category,spice_level,target,duration,description,is_special,active').eq('owner_id', ownerId)
  return result.error ? null : (result.data as CloudDare[]).map(fromCloud)
}

export async function syncCloudDares(dares: Dare[]) {
  const ownerId = await currentUserId()
  if (!supabase || !ownerId || dares.length === 0) return false
  const rows = dares.map(dare => ({ id: dare.id, owner_id: ownerId, text: dare.text, category: dare.category, spice_level: dare.spiceLevel, target: dare.target, duration: dare.duration ?? null, description: dare.description ?? null, is_special: dare.isSpecial, active: dare.active !== false }))
  const result = await supabase.from('custom_dares').upsert(rows)
  return !result.error
}

export async function requestMagicLink(email: string) {
  if (!supabase) return 'Supabase ist noch nicht eingerichtet.'
  const result = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
  return result.error?.message ?? null
}

export async function cloudIdentity() {
  if (!supabase) return null
  const result = await supabase.auth.getUser()
  return result.data.user?.email ?? null
}

export async function signOutCloud() {
  if (supabase) await supabase.auth.signOut()
}
