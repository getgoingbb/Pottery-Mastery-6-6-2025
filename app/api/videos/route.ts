import { NextResponse } from "next/server"

// This is a placeholder for a real video API
// In a production app, you would fetch this data from your database

// Mock database of course videos
const courseVideos = [
  {
    id: 1,
    title: "1. Wheel Throwing Fundamentals",
    duration: "45:22",
    thumbnail:
      "https://sjc.microlink.io/GXilfkrRZn2aK62UGdpQdpLYk-daY6HcIJHhE2NNvrbXFuv3RPoGl7iKyW3MzdpmAbAvtxna-gewCfs5fKm4Tg.jpeg",
    description: "Learn the fundamentals of centering clay and creating basic forms on the pottery wheel.",
    publicVideoId: "aNUuCSGXKRM", // Public preview video ID
    privateVideoId: "YOUR_PRIVATE_VIDEO_ID_1", // Replace with your private video ID
  },
  {
    id: 2,
    title: "2. Introduction to Pottery",
    duration: "38:15",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Get started with the basics of pottery and understand the essential tools and materials.",
    publicVideoId: "PeqRaS6YrcU",
    privateVideoId: "YOUR_PRIVATE_VIDEO_ID_2", // Replace with your private video ID
  },
  // Additional videos would be listed here
]

export async function GET(request: Request) {
  // In a real app, you would check authentication and authorization here
  // Only return private video IDs to authenticated users who have purchased the course

  const { searchParams } = new URL(request.url)
  const authToken = searchParams.get("token")

  // Mock authentication check
  const isAuthenticated = authToken === "valid_token"
  const hasPurchased = isAuthenticated

  // Return videos with or without private IDs based on authentication
  const videos = courseVideos.map((video) => ({
    ...video,
    // Only include private video ID if user is authenticated and has purchased
    privateVideoId: hasPurchased ? video.privateVideoId : null,
  }))

  return NextResponse.json({ videos })
}
