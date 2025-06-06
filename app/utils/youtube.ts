/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url YouTube URL (can be youtube.com/watch?v=ID or youtu.be/ID format)
 * @returns The video ID or null if not a valid YouTube URL
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Handle youtu.be format
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split(/[?&#]/)[0]
    return id || null
  }

  // Handle youtube.com format
  if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1])
    return urlParams.get("v")
  }

  // If the string is just the ID itself (no URL)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url
  }

  return null
}

/**
 * Generates a YouTube embed URL from a video ID
 * @param videoId YouTube video ID
 * @param autoplay Whether to autoplay the video
 * @returns YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay = false): string {
  if (!videoId) return ""

  const baseUrl = "https://www.youtube.com/embed/"
  const params = autoplay ? "?autoplay=1" : ""

  return `${baseUrl}${videoId}${params}`
}
