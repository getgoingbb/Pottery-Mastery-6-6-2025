import { Pool } from "pg"

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}

// User-related database functions
export async function getUserByEmail(email: string) {
  const result = await query('SELECT id, name, email, role, "hasPurchased", "createdAt" FROM users WHERE email = $1', [
    email,
  ])
  return result.rows[0] || null
}

export async function getUserById(id: string) {
  const result = await query('SELECT id, name, email, role, "hasPurchased", "createdAt" FROM users WHERE id = $1', [id])
  return result.rows[0] || null
}

export async function createUser(userData: {
  name?: string
  email: string
  role?: string
  hasPurchased?: boolean
}) {
  const { name, email, role = "user", hasPurchased = false } = userData

  const result = await query(
    'INSERT INTO users (name, email, role, "hasPurchased") VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, "hasPurchased"',
    [name, email, role, hasPurchased],
  )
  return result.rows[0]
}

// Course progress functions
export async function getVideoProgress(userId: string, videoId: string) {
  const result = await query('SELECT * FROM course_progress WHERE "userId" = $1 AND "videoId" = $2', [userId, videoId])
  return result.rows[0] || null
}

export async function markVideoComplete(userId: string, videoId: string) {
  const result = await query(
    `INSERT INTO course_progress ("userId", "videoId", completed, "completedAt") 
     VALUES ($1, $2, TRUE, NOW()) 
     ON CONFLICT ("userId", "videoId") 
     DO UPDATE SET completed = TRUE, "completedAt" = NOW()
     RETURNING *`,
    [userId, videoId],
  )
  return result.rows[0]
}

export async function getUserProgress(userId: string) {
  const result = await query('SELECT "videoId", completed, "completedAt" FROM course_progress WHERE "userId" = $1', [
    userId,
  ])
  return result.rows
}

// Purchase functions
export async function createPurchase(purchaseData: {
  userId: string
  amount: number
  currency?: string
  stripePaymentId?: string
}) {
  const { userId, amount, currency = "USD", stripePaymentId } = purchaseData

  const result = await query(
    'INSERT INTO purchases ("userId", amount, currency, "stripePaymentId") VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, amount, currency, stripePaymentId],
  )

  // Update user's purchase status
  await query('UPDATE users SET "hasPurchased" = TRUE WHERE id = $1', [userId])

  return result.rows[0]
}

export async function getUserPurchases(userId: string) {
  const result = await query('SELECT * FROM purchases WHERE "userId" = $1 ORDER BY "createdAt" DESC', [userId])
  return result.rows
}
