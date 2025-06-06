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

    // Get total users
    const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

    // Get users with purchases
    const { count: purchasedUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("has_purchased", true)

    // Get total revenue
    const { data: purchases } = await supabase.from("purchases").select("amount")

    const totalRevenue = purchases?.reduce((sum, purchase) => sum + Number(purchase.amount), 0) || 0

    // Get video completion stats
    const { data: progressData } = await supabase.from("course_progress").select("video_id, completed")

    const videoStats =
      progressData?.reduce((acc, progress) => {
        if (!acc[progress.video_id]) {
          acc[progress.video_id] = { total: 0, completed: 0 }
        }
        acc[progress.video_id].total++
        if (progress.completed) {
          acc[progress.video_id].completed++
        }
        return acc
      }, {}) || {}

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      purchasedUsers: purchasedUsers || 0,
      totalRevenue,
      videoStats,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
