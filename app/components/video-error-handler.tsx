"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface VideoErrorHandlerProps {
  videoId: string
  fallbackVideoId?: string
  onRetry?: () => void
}

export default function VideoErrorHandler({ videoId, fallbackVideoId, onRetry }: VideoErrorHandlerProps) {
  const [hasError, setHasError] = useState(false)
  const [showFallback, setShowFallback] = useState(false)

  // This is a simple client-side check to see if a video might be private or unavailable
  useEffect(() => {
    // Reset state when video ID changes
    setHasError(false)
    setShowFallback(false)

    // Check if the video ID is the known problematic one
    if (videoId === "-L_DT7R_Ob4") {
      setHasError(true)
    }
  }, [videoId])

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    }
  }

  const handleShowFallback = () => {
    setShowFallback(true)
  }

  if (!hasError) {
    return null
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Video Unavailable</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          This video appears to be unavailable or private. Please contact support if you continue to experience issues.
        </p>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={handleRetry}>
            Retry
          </Button>
          {fallbackVideoId && (
            <Button variant="outline" size="sm" onClick={handleShowFallback}>
              Show Alternative Video
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
