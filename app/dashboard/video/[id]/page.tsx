"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { getYouTubeEmbedUrl } from "@/app/utils/youtube"
import { COURSE_VIDEOS } from "@/app/data/course-videos"
import AuthGuard from "@/app/components/auth-guard"
import VideoAccessManager from "@/app/components/video-access-manager"

export default function VideoPage({ params }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { id } = params
  const [video, setVideo] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [markingComplete, setMarkingComplete] = useState(false)

  useEffect(() => {
    const videoData = COURSE_VIDEOS.find((v) => v.id === id)

    if (videoData) {
      setVideo(videoData)
    } else {
      setError("Video not found")
    }

    setLoading(false)
  }, [id])

  useEffect(() => {
    // Fetch user's progress from the database
    const fetchProgress = async () => {
      if (!session?.user?.id) return

      try {
        const response = await fetch("/api/progress")
        if (response.ok) {
          const data = await response.json()
          const videoProgress = data.progress.find((p) => p.videoId === id)
          if (videoProgress?.completed) {
            setCompleted(true)
          }
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    fetchProgress()
  }, [session?.user?.id, id])

  const handleMarkComplete = async () => {
    if (!session?.user?.id || markingComplete) return

    setMarkingComplete(true)
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId: id }),
      })

      if (response.ok) {
        setCompleted(true)
      } else {
        console.error("Failed to mark video as complete")
      }
    } catch (error) {
      console.error("Error marking video complete:", error)
    } finally {
      setMarkingComplete(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </AuthGuard>
    )
  }

  if (error) {
    return (
      <AuthGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
          <div className="text-center mt-4">
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  const embedUrl = getYouTubeEmbedUrl(video.unlistedVideoId)

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoAccessManager
              videoId={video.unlistedVideoId}
              isPrivateVideo={video.isPrivateVideo}
              fallbackVideoId={video.publicVideoId}
            />

            {video.isPrivateVideo && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 text-sm">
                  <strong>Private Video Notice:</strong> This video requires you to be signed into YouTube with an
                  authorized Google account. If you're having trouble accessing it, try the preview version or contact
                  support.
                </p>
              </div>
            )}

            <div className="aspect-video mb-6 mt-4">
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{video.description}</p>
            </div>

            <div className="flex justify-between items-center">
              {completed ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" /> Marked as completed
                </div>
              ) : (
                <Button onClick={handleMarkComplete} disabled={markingComplete}>
                  {markingComplete ? "Marking Complete..." : "Mark as Completed"}
                </Button>
              )}

              <Button variant="outline" asChild>
                <Link href="/dashboard">Back to All Videos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}
