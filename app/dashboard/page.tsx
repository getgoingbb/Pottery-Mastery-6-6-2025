"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Download, BadgeIcon as Certificate, BookOpen, ExternalLink, CheckCircle } from "lucide-react"
import { COURSE_VIDEOS } from "@/app/data/course-videos"
import AuthGuard from "@/app/components/auth-guard"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [videos] = useState(COURSE_VIDEOS)
  const [completedVideos, setCompletedVideos] = useState([])

  useEffect(() => {
    // Get completed videos from Supabase
    const fetchProgress = async () => {
      if (!session?.user?.id) return

      try {
        const response = await fetch("/api/progress")
        if (response.ok) {
          const data = await response.json()
          const completedVideoIds = data.progress.filter((p) => p.completed).map((p) => p.video_id)
          setCompletedVideos(completedVideoIds)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    fetchProgress()
  }, [session?.user?.id])

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  const isVideoCompleted = (videoId) => {
    return completedVideos.includes(videoId)
  }

  const completedCount = completedVideos.length
  const progressPercentage = (completedCount / videos.length) * 100

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/st1-deJExajOF0d7tE8vXxCQEI1DFuN6zw.png"
                alt="Stephen Jepson"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-xl">Pottery Mastery</span>
            </div>
            <div className="flex items-center gap-4">
              {session?.user && <span className="text-gray-600">Welcome, {session.user.name}</span>}
              {session?.user?.role === "admin" && (
                <Button variant="outline" asChild>
                  <Link href="/admin">Admin Dashboard</Link>
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Rest of the dashboard content remains the same */}
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Member Dashboard</h1>

          <Tabs defaultValue="videos">
            <TabsList className="mb-8">
              <TabsTrigger value="videos">Tutorial Videos</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="instructor">Your Instructor</TabsTrigger>
              <TabsTrigger value="certificate">Certificate</TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    hasPurchased={session?.user?.hasPurchased}
                    isCompleted={isVideoCompleted(video.id)}
                    setCompletedVideos={setCompletedVideos}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Pottery Tools Guide"
                  type="PDF"
                  icon={<BookOpen className="h-6 w-6" />}
                  description="A comprehensive guide to pottery tools and their uses."
                />
                <ResourceCard
                  title="Clay Types Comparison"
                  type="PDF"
                  icon={<BookOpen className="h-6 w-6" />}
                  description="Compare different clay bodies and their properties."
                />
                <ResourceCard
                  title="Glaze Recipe Collection"
                  type="PDF"
                  icon={<BookOpen className="h-6 w-6" />}
                  description="A collection of tested glaze recipes for various effects."
                />
                <ResourceCard
                  title="Pottery Troubleshooting Checklist"
                  type="PDF"
                  icon={<BookOpen className="h-6 w-6" />}
                  description="A printable checklist for diagnosing and fixing common pottery issues."
                />
              </div>
            </TabsContent>

            <TabsContent value="instructor">
              {/* Instructor content remains the same */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/st1-deJExajOF0d7tE8vXxCQEI1DFuN6zw.png"
                        alt="Stephen Jepson"
                        width={192}
                        height={192}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Stephen Michael Jepson</h2>
                      <p className="text-gray-600 mb-4">
                        Stephen Jepson was born May 31, 1941, in Sioux City, Iowa. After receiving his MFA from Alfred
                        University in 1971, he opened his studio in Geneva, Florida, and taught ceramics at the
                        University of Central Florida for eight years.
                      </p>
                      <p className="text-gray-600 mb-4">
                        In 1976, his lid jar was selected to be included in the Smithsonian Museum Collection. In 1993,
                        he founded the video production company Thoughtful Productions, creating instructional videos to
                        teach intermediate and beginner potters how to improve their technique.
                      </p>
                      <p className="text-gray-600 mb-4">
                        Beyond pottery, Stephen is the founder of "Never Leave The Playground," a wellness philosophy
                        that promotes physical activity and play for cognitive and physical health. He's been a keynote
                        speaker at events worldwide, including the Fitness Business Summit and Ido Portal Movement Camp
                        in Thailand.
                      </p>
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Education</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>Bachelor of Science Degree - Truman University, 1969</li>
                          <li>Master of Fine Arts Degree - Alfred University, 1971</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-xl font-bold mb-4">Never Leave The Playground</h3>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <Image
                          src="https://sjc.microlink.io/rmSKwRiu_K_9RpBu5phWyvQ7RYEUCACViVWLnvpPGHVieHLd98zutoBdGr_tgz59CO_2xQvAGTR7_03FLL-ReA.jpeg"
                          alt="Stephen Jepson speaking"
                          width={400}
                          height={300}
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-gray-600 mb-4">
                          Stephen's "Never Leave The Playground" philosophy teaches that engaging in playful physical
                          activities creates new neural pathways in the brain, potentially preventing or delaying
                          conditions like Alzheimer's, MS, and Parkinson's.
                        </p>
                        <p className="text-gray-600 mb-4">
                          This holistic approach to wellness complements his pottery teaching, as both require focus,
                          coordination, and mindfulness. The hand-eye coordination and fine motor skills developed
                          through pottery contribute to overall brain health and cognitive function.
                        </p>
                        <Button variant="outline" className="mt-2" asChild>
                          <a
                            href="https://neverleavetheplayground.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Visit Never Leave The Playground <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificate">
              {/* Certificate content remains the same */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                      <Certificate className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Your Certificate of Completion</h2>
                    <p className="text-gray-600">Complete all 7 videos to earn your certificate</p>
                  </div>

                  <div
                    className={`bg-gray-100 p-8 rounded-lg mb-6 relative ${completedCount === videos.length ? "" : "overflow-hidden"}`}
                  >
                    {completedCount < videos.length && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <p className="text-xl font-medium text-gray-500">
                          Complete all videos to unlock your certificate
                        </p>
                      </div>
                    )}
                    <div className={completedCount < videos.length ? "opacity-30" : ""}>
                      <div className="border-4 border-amber-600 p-8 rounded-lg text-center">
                        <h3 className="text-2xl font-serif mb-4">Certificate of Completion</h3>
                        <p className="text-lg mb-2">This certifies that</p>
                        <p className="text-xl font-bold mb-2">{session?.user?.name || "Student"}</p>
                        <p className="text-lg mb-4">has successfully completed the</p>
                        <p className="text-xl font-bold mb-4">Pottery Mastery Course</p>
                        <div className="flex justify-center gap-12 mt-8">
                          <div className="text-center">
                            <p className="border-t border-gray-400 pt-2">Date</p>
                          </div>
                          <div className="text-center">
                            <p className="border-t border-gray-400 pt-2">Instructor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Your progress: {completedCount}/{videos.length} videos completed
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                      <div
                        className="bg-amber-600 h-2.5 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <Button disabled={completedCount < videos.length}>Download Certificate</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}

// VideoCard component remains the same
function VideoCard({ video, hasPurchased, isCompleted, setCompletedVideos }) {
  const { data: session } = useSession()

  const handleMarkComplete = async (videoId) => {
    if (!session?.user?.id) return

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      })

      if (response.ok) {
        // Refresh the completed videos list
        setCompletedVideos((prev) => [...prev, videoId])
      }
    } catch (error) {
      console.error("Error marking video complete:", error)
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
          alt={video.title}
          width={350}
          height={200}
          className="w-full object-cover h-48"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            <CheckCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{video.title}</CardTitle>
        <CardDescription>{video.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {hasPurchased ? (
          <>
            <Button className="w-full" asChild>
              <Link href={`/dashboard/video/${video.id}`}>
                <Play className="mr-2 h-4 w-4" /> {isCompleted ? "Rewatch Video" : "Watch Video"}
              </Link>
            </Button>
            {!isCompleted && (
              <Button variant="secondary" className="w-full mt-2" onClick={() => handleMarkComplete(video.id)}>
                Mark as Complete
              </Button>
            )}
          </>
        ) : (
          <Button className="w-full" asChild>
            <Link href="/subscribe">Unlock Course</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// ResourceCard component remains the same
function ResourceCard({ title, type, icon, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-600">{icon}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="#">
            <Download className="mr-2 h-4 w-4" /> Download {type}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
