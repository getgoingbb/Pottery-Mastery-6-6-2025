import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createServerClient()
    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, email, role, has_purchased, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, updates } = await request.json()

    const supabase = createServerClient()
    const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

    if (error) throw error

    return NextResponse.json({ user: data })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
