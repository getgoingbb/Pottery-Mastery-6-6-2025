import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// Database helper functions for Neon
export async function getUserByEmail(email: string) {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function createUser(userData: {
  name?: string
  email: string
  role?: string
  has_purchased?: boolean
}) {
  try {
    const { name, email, role = "user", has_purchased = false } = userData

    const result = await sql`
      INSERT INTO users (name, email, role, has_purchased, created_at, updated_at) 
      VALUES (${name}, ${email}, ${role}, ${has_purchased}, NOW(), NOW()) 
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function getUserProgress(userId: string) {
  try {
    const result = await sql`SELECT * FROM course_progress WHERE user_id = ${userId}`
    return result || []
  } catch (error) {
    console.error("Error getting user progress:", error)
    return []
  }
}

export async function markVideoComplete(userId: string, videoId: string) {
  try {
    const result = await sql`
      INSERT INTO course_progress (user_id, video_id, completed, completed_at, created_at) 
      VALUES (${userId}, ${videoId}, true, NOW(), NOW()) 
      ON CONFLICT (user_id, video_id) 
      DO UPDATE SET completed = true, completed_at = NOW()
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error("Error marking video complete:", error)
    return null
  }
}
