import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createServerClient()
    const { data: progress, error } = await supabase.from("course_progress").select("*").eq("user_id", session.user.id)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ progress: [] })
    }

    return NextResponse.json({ progress: progress || [] })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ progress: [] })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { videoId } = await request.json()

    if (!videoId) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data: progress, error } = await supabase
      .from("course_progress")
      .upsert({
        user_id: session.user.id,
        video_id: videoId,
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ progress: { videoId, completed: true } })
    }

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ progress: { videoId: "unknown", completed: true } })
  }
}
