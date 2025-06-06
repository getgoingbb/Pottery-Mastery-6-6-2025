"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Lock, Unlock } from "lucide-react"

interface VideoAccessManagerProps {
  videoId: string
  isPrivateVideo?: boolean
  fallbackVideoId?: string
}

export default function VideoAccessManager({
  videoId,
  isPrivateVideo = false,
  fallbackVideoId,
}: VideoAccessManagerProps) {
  const { data: session } = useSession()
  const [showPrivateVideoHelp, setShowPrivateVideoHelp] = useState(false)

  // Check if user has purchased the course
  const hasPurchased = session?.user?.hasPurchased

  if (!hasPurchased) {
    return (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>Course Access Required</AlertTitle>
        <AlertDescription>
          <p className="mb-2">This video is part of the premium course content.</p>
          <Button size="sm" asChild>
            <a href="/subscribe">Purchase Course Access</a>
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (isPrivateVideo) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Private Video Access Required</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              This video is set to private on YouTube. You need to be signed into YouTube with an authorized Google
              account to view it.
            </p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => setShowPrivateVideoHelp(!showPrivateVideoHelp)}>
                {showPrivateVideoHelp ? "Hide" : "Show"} Help
              </Button>
              {fallbackVideoId && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`/dashboard/video/preview/${fallbackVideoId}`}>Watch Preview Instead</a>
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>

        {showPrivateVideoHelp && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How to Access Private Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Make sure you're signed into YouTube with your Google account</li>
                <li>Contact support with your Google account email to request access</li>
                <li>Wait for access to be granted (this may take 24-48 hours)</li>
                <li>Refresh this page and try again</li>
              </ol>

              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> For the best experience, we recommend using unlisted videos instead of private
                  videos for course content.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <Alert>
      <Unlock className="h-4 w-4" />
      <AlertTitle>Video Access Granted</AlertTitle>
      <AlertDescription>You have access to this course content. Enjoy your learning!</AlertDescription>
    </Alert>
  )
}
