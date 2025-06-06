"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { extractYouTubeVideoId } from "@/app/utils/youtube"
import { COURSE_VIDEOS } from "@/app/data/course-videos"

// This is a simple admin component for managing course videos
// In a real application, this would connect to your database

export default function VideoManager() {
  const [videos, setVideos] = useState(COURSE_VIDEOS)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [isPublic, setIsPublic] = useState(false)

  const handleSelectVideo = (video) => {
    setCurrentVideo(video)
    setVideoUrl("")
    setIsPublic(false)
  }

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value)
  }

  const handleUpdateVideo = () => {
    if (!currentVideo || !videoUrl) return

    const videoId = extractYouTubeVideoId(videoUrl)
    if (!videoId) {
      alert("Invalid YouTube URL")
      return
    }

    const updatedVideos = videos.map((video) => {
      if (video.id === currentVideo.id) {
        return {
          ...video,
          [isPublic ? "publicVideoId" : "unlistedVideoId"]: videoId,
        }
      }
      return video
    })

    setVideos(updatedVideos)
    setVideoUrl("")
    alert(`Video ${isPublic ? "public preview" : "unlisted course content"} updated successfully!`)

    // In a real app, you would save this to your database
    console.log("Updated videos:", updatedVideos)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Video Manager</h2>
      <p className="text-gray-600">
        Use this tool to manage your course videos. You can update the public preview videos and the unlisted course
        content videos.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Videos</CardTitle>
            <CardDescription>Select a video to update</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {videos.map((video) => (
                <li key={video.id}>
                  <Button
                    variant={currentVideo?.id === video.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleSelectVideo(video)}
                  >
                    {video.title}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {currentVideo && (
          <Card>
            <CardHeader>
              <CardTitle>Update {currentVideo.title}</CardTitle>
              <CardDescription>Enter the YouTube URL for this video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-type">Video Type</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={isPublic ? "default" : "outline"}
                    onClick={() => setIsPublic(true)}
                    className="flex-1"
                  >
                    Public Preview
                  </Button>
                  <Button
                    variant={!isPublic ? "default" : "outline"}
                    onClick={() => setIsPublic(false)}
                    className="flex-1"
                  >
                    Unlisted Course Content
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="video-url">YouTube URL</Label>
                <Input
                  id="video-url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={handleVideoUrlChange}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the full YouTube URL. The video ID will be extracted automatically.
                </p>
              </div>

              <div>
                <Label>Current Video IDs</Label>
                <div className="mt-1 space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Public Preview:</span>{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{currentVideo.publicVideoId}</code>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Unlisted Course Content:</span>{" "}
                    <code className="bg-gray-100 px-1 py-0.5 rounded">{currentVideo.unlistedVideoId}</code>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateVideo} disabled={!videoUrl}>
                Update Video
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="font-medium text-amber-800 mb-2">How to Set Up YouTube Videos</h3>
        <ol className="list-decimal list-inside space-y-2 text-amber-700">
          <li>Upload your video to YouTube</li>
          <li>
            Set the video to <strong>Unlisted</strong> in the visibility settings (not Private or Public)
          </li>
          <li>Copy the YouTube URL (e.g., https://www.youtube.com/watch?v=vyncbAT-ijs)</li>
          <li>Paste the URL in the form above and click "Update Video"</li>
        </ol>
      </div>
    </div>
  )
}
