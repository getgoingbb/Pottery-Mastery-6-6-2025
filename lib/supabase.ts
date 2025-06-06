import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export function createServerClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database helper functions
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error && error.code !== "PGRST116") {
    throw error
  }

  return data
}

export async function createUser(userData: {
  name?: string
  email: string
  role?: string
  has_purchased?: boolean
}) {
  const { data, error } = await supabase.from("users").insert([userData]).select().single()

  if (error) throw error
  return data
}

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase.from("course_progress").select("*").eq("user_id", userId)

  if (error) throw error
  return data || []
}

export async function markVideoComplete(userId: string, videoId: string) {
  const { data, error } = await supabase
    .from("course_progress")
    .upsert({
      user_id: userId,
      video_id: videoId,
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}
