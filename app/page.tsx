import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Play } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
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
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="#features" className="font-medium">
              Features
            </Link>
            <Link href="#testimonials" className="font-medium">
              Testimonials
            </Link>
            <Link href="#pricing" className="font-medium">
              Pricing
            </Link>
          </nav>
          <div>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Master the Art of Pottery</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
              Learn pottery techniques from an expert with our comprehensive 7-video course. Transform clay into
              beautiful creations with lifetime access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/subscribe">Get Lifetime Access - $29.99</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden max-w-4xl mx-auto shadow-xl">
              <Image
                src="https://sjc.microlink.io/GXilfkrRZn2aK62UGdpQdpLYk-daY6HcIJHhE2NNvrbXFuv3RPoGl7iKyW3MzdpmAbAvtxna-gewCfs5fKm4Tg.jpeg"
                alt="Pottery wheel throwing demonstration"
                width={1200}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full w-16 h-16 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Wheel Throwing Fundamentals"
                description="Learn the fundamentals of centering clay and creating basic forms on the pottery wheel."
                number="1"
              />
              <FeatureCard
                title="Introduction to Pottery"
                description="Get started with the basics of pottery and understand the essential tools and materials."
                number="2"
              />
              <FeatureCard
                title="Advanced Throwing Techniques"
                description="Take your throwing skills to the next level with advanced techniques and forms."
                number="3"
              />
              <FeatureCard
                title="Hand Building Essentials"
                description="Master the art of hand building with pinch pots, coil building, and slab construction."
                number="4"
              />
              <FeatureCard
                title="Glazing Techniques"
                description="Learn various glazing methods to add color and finish to your pottery creations."
                number="5"
              />
              <FeatureCard
                title="Pottery Design Principles"
                description="Develop your personal style and learn design principles for functional pottery."
                number="6"
              />
              <FeatureCard
                title="Marketing Your Pottery"
                description="Learn how to successfully market and sell your pottery creations."
                number="7"
              />
            </div>
          </div>
        </section>

        {/* Video Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Preview Stephen's Teaching Style</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/aNUuCSGXKRM"
                    title="Wheel Throwing Fundamentals"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Wheel Throwing Fundamentals</h3>
                  <p className="text-gray-600 mb-4">
                    This instructional video covers the basics of centering clay on the wheel and creating your first
                    pottery forms. Perfect for beginners starting their pottery journey.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Play className="h-4 w-4 mr-1" /> Free Preview
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/PeqRaS6YrcU"
                    title="Introduction to Pottery"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Introduction to Pottery</h3>
                  <p className="text-gray-600 mb-4">
                    Get started with the basics of pottery and understand the essential tools, materials, and techniques
                    you'll need to begin your pottery journey.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Play className="h-4 w-4 mr-1" /> Free Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                These are just samples of Stephen's teaching style. The full course includes 7 comprehensive videos with
                more in-depth instruction and techniques.
              </p>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
                <Link href="/subscribe">Get Full Access Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Course Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What's Included in the Course</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-4">Hands-On Demonstrations</h3>
                <p className="text-gray-600 mb-6">
                  Each video features clear, detailed demonstrations of pottery techniques. Stephen guides you through
                  every step of the process, from preparing your clay to finishing your pieces.
                </p>
                <p className="text-gray-600 mb-6">
                  You'll learn proper hand positioning, tool usage, and the subtle techniques that make the difference
                  between amateur and professional-looking pottery.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-amber-600 hover:bg-amber-700" asChild>
                    <Link href="/subscribe">Get Started</Link>
                  </Button>
                  <Button variant="outline">Watch Sample</Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="https://sjc.microlink.io/GXilfkrRZn2aK62UGdpQdpLYk-daY6HcIJHhE2NNvrbXFuv3RPoGl7iKyW3MzdpmAbAvtxna-gewCfs5fKm4Tg.jpeg"
                    alt="Pottery wheel throwing demonstration"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-md bg-white p-4 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-bold text-lg mb-2">Video 1</p>
                    <p className="text-gray-600 text-sm">Wheel Throwing Fundamentals</p>
                    <p className="text-amber-600 text-xs mt-2">45:22</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md bg-white p-4 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-bold text-lg mb-2">Video 2</p>
                    <p className="text-gray-600 text-sm">Introduction to Pottery</p>
                    <p className="text-amber-600 text-xs mt-2">38:15</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md bg-white p-4 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-amber-600 font-bold">+5 more videos</p>
                    <p className="text-gray-600 text-sm mt-1">Unlock all content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet Your Instructor</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
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
                <h3 className="text-2xl font-bold mb-4">Stephen Michael Jepson</h3>
                <p className="text-gray-600 mb-4">
                  Born in 1941 in Sioux City, Iowa, Stephen Jepson is a master potter with an impressive career spanning
                  decades. After receiving his MFA from Alfred University in 1971, he established his studio in Geneva,
                  Florida, and taught ceramics at the University of Central Florida for eight years.
                </p>
                <p className="text-gray-600 mb-4">
                  His work has been recognized by the Smithsonian Museum, which selected his jar with lid for their
                  collection in 1976. In 1993, he founded Thoughtful Productions, creating instructional pottery videos,
                  and later established The World Pottery Institute in Geneva, Florida in 1997.
                </p>
                <p className="text-gray-600">
                  Beyond pottery, Stephen is a renowned wellness speaker and founder of "Never Leave The Playground," a
                  philosophy promoting physical activity and play for cognitive and physical health. He's been a keynote
                  speaker at events worldwide, including the Fitness Business Summit and Ido Portal Movement Camp in
                  Thailand.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#instructor-philosophy">Learn about Stephen's wellness philosophy</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor Philosophy Section */}
        <section id="instructor-philosophy" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
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
                  <h2 className="text-3xl font-bold mb-4">Never Leave The Playground</h2>
                  <p className="text-gray-600 mb-4">
                    Stephen Jepson believes that the key to lifelong health and cognitive function is continuous
                    movement and play. His "Never Leave The Playground" philosophy teaches that engaging in playful
                    physical activities creates new neural pathways in the brain, potentially preventing or delaying
                    conditions like Alzheimer's, MS, and Parkinson's.
                  </p>
                  <p className="text-gray-600">
                    This holistic approach to wellness complements his pottery teaching, as both require focus,
                    coordination, and mindfulness. In this pottery course, you'll benefit not only from Stephen's
                    technical expertise but also from his understanding of how hand-eye coordination and fine motor
                    skills contribute to overall brain health.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Expert Knowledge</h3>
                    <p className="text-gray-600">
                      Stephen brings decades of research and hands-on experience in both pottery and movement training,
                      creating a unique learning experience that benefits both your creative skills and overall
                      wellbeing.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Holistic Approach</h3>
                    <p className="text-gray-600">
                      Learn pottery techniques that not only create beautiful art but also enhance fine motor skills,
                      coordination, and focus—all contributing to better cognitive health and physical wellness.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Inspiration & Empowerment</h3>
                    <p className="text-gray-600">
                      Stephen's teaching style combines technical instruction with motivational guidance, inspiring
                      students to embrace creativity and movement as pathways to a more fulfilling and healthier life.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Students Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                role="Beginner Potter"
                quote="These videos transformed my pottery skills. The instructor explains everything so clearly, and I can rewatch whenever I need a refresher."
              />
              <TestimonialCard
                name="Michael Chen"
                role="Hobby Enthusiast"
                quote="Worth every penny! I've taken in-person classes before, but having these videos to reference at home has improved my technique dramatically."
              />
              <TestimonialCard
                name="Emma Williams"
                role="Art Teacher"
                quote="I use these videos to supplement my classroom teaching. The production quality is excellent, and my students love following along."
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Special Offer</h2>
            <p className="text-xl text-center mb-12 text-gray-600 max-w-2xl mx-auto">
              Get lifetime access to all 7 pottery videos for a one-time payment.
            </p>

            <div className="max-w-md mx-auto">
              <Card className="border-2 border-amber-600">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Lifetime Access</h3>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-gray-500 line-through text-lg">$99.99</span>
                      <span className="text-4xl font-bold">$29.99</span>
                    </div>
                    <p className="text-amber-600 font-medium">Limited Time Offer</p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    <BenefitItem text="Access to all 7 pottery tutorial videos" />
                    <BenefitItem text="Lifetime updates and new content" />
                    <BenefitItem text="HD quality streaming" />
                    <BenefitItem text="Watch on any device" />
                    <BenefitItem text="Downloadable resources" />
                    <BenefitItem text="Certificate of completion" />
                  </ul>

                  <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                    <Link href="/subscribe">Get Lifetime Access Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <FaqItem
                question="How do I access the videos after purchase?"
                answer="After your purchase is complete, you'll receive login credentials to access our members area where all videos are available to stream."
              />
              <FaqItem
                question="Can I download the videos to watch offline?"
                answer="The videos are available for streaming in the members area. For offline viewing, you can access them through our private YouTube links when you have internet connection."
              />
              <FaqItem
                question="How long do I have access to the course?"
                answer="This is a lifetime access purchase. Once you buy the course, you'll have access to all current and future updates for as long as the platform exists."
              />
              <FaqItem
                question="Do I need any special equipment to follow along?"
                answer="The instructor will cover equipment needs in the first video. Basic pottery tools and access to clay will be helpful, but you can start with minimal supplies."
              />
              <FaqItem
                question="Is this course suitable for complete beginners?"
                answer="The course starts with fundamentals and gradually progresses to more advanced techniques. Complete beginners will feel comfortable following along."
              />
              <FaqItem
                question="How does pottery relate to Stephen's wellness philosophy?"
                answer="Stephen believes that working with clay engages both mind and body, creating new neural pathways while developing fine motor skills. The focus and coordination required in pottery align perfectly with his 'Never Leave The Playground' approach to lifelong wellness."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-amber-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Pottery Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their pottery skills with our comprehensive video course.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/subscribe">Get Lifetime Access - Only $29.99</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Pottery Mastery</h3>
              <p className="text-gray-400">
                Transforming clay enthusiasts into skilled potters through comprehensive video tutorials.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-400 hover:text-white">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Have questions? Reach out to us at:</p>
              <p className="text-gray-400">support@potterymastery.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Pottery Mastery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, number }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 flex-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ name, role, quote }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-600"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
          </svg>
        </div>
        <p className="text-gray-600 mb-4 flex-1">{quote}</p>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function BenefitItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  )
}

function FaqItem({ question, answer }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
