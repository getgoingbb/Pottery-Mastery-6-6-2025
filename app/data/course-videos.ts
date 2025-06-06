// This file contains all the course video data
// In a production app, this would be stored in a database

export interface CourseVideo {
  id: string
  title: string
  duration: string
  thumbnail: string
  description: string
  publicVideoId: string // For preview/public videos
  unlistedVideoId: string // For members-only content (unlisted videos)
  isPrivateVideo?: boolean // Flag to indicate if this is a private video requiring special handling
}

export const COURSE_VIDEOS: CourseVideo[] = [
  {
    id: "1",
    title: "1. Wheel Throwing Fundamentals",
    duration: "45:22",
    thumbnail:
      "https://sjc.microlink.io/GXilfkrRZn2aK62UGdpQdpLYk-daY6HcIJHhE2NNvrbXFuv3RPoGl7iKyW3MzdpmAbAvtxna-gewCfs5fKm4Tg.jpeg",
    description: "Learn the fundamentals of centering clay and creating basic forms on the pottery wheel.",
    publicVideoId: "oliDf5Ifm3U", // Public preview video ID
    unlistedVideoId: "vyncbAT-ijs", // Your first video ID (currently private)
    isPrivateVideo: true, // Mark this as private since it requires special access
  },
  {
    id: "2",
    title: "2. Pottery Decoration Traditional Techniques",
    duration: "38:15",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Learn traditional techniques for decorating your pottery pieces with beautiful designs.",
    publicVideoId: "PeqRaS6YrcU",
    unlistedVideoId: "kuIhtlOiYYU", // Pottery Decoration Traditional Techniques
    isPrivateVideo: false, // This one is unlisted, not private
  },
  {
    id: "3",
    title: "3. Intro To Hand Building",
    duration: "52:07",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Master the art of hand building with pinch pots, coil building, and slab construction.",
    publicVideoId: "cAMZQeA6F_I",
    unlistedVideoId: "Mq-aGjhjtsU", // Intro To Hand Building
    isPrivateVideo: false,
  },
  {
    id: "4",
    title: "4. Advanced Techniques",
    duration: "41:33",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Take your pottery skills to the next level with these advanced techniques.",
    publicVideoId: "b6S3G_FtP58",
    unlistedVideoId: "KfxLFdLMnWo", // Fourth video
    isPrivateVideo: false,
  },
  {
    id: "5",
    title: "5. Glazing Techniques",
    duration: "58:49",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Learn various glazing methods to add color and finish to your pottery creations.",
    publicVideoId: "mK9Zyk5DVtY",
    unlistedVideoId: "CtAC_kjqyDc", // Fifth video
    isPrivateVideo: false,
  },
  {
    id: "6",
    title: "6. Pottery Design Principles",
    duration: "47:12",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Develop your personal style and learn design principles for functional pottery.",
    publicVideoId: "783vxblEIHg",
    unlistedVideoId: "GK27VZiV_Nw", // Sixth video
    isPrivateVideo: false,
  },
  {
    id: "7",
    title: "7. Marketing Your Pottery",
    duration: "36:28",
    thumbnail: "/placeholder.svg?height=200&width=350",
    description: "Learn how to successfully market and sell your pottery creations.",
    publicVideoId: "lOu8UdBx590",
    unlistedVideoId: "YOUR_UNLISTED_VIDEO_ID_7", // Replace with your seventh video when available
    isPrivateVideo: false,
  },
]
