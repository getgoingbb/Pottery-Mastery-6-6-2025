import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>

          <p className="text-gray-600 mb-6">
            Your payment has been successfully processed and your account has been created. You now have lifetime access
            to all 7 pottery tutorial videos.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-medium mb-2">Your Account Details</h2>
            <p className="text-gray-600 text-sm">
              We've sent your login details to your email. Please check your inbox (and spam folder) for instructions on
              how to access your course.
            </p>
          </div>

          <div className="space-y-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard">Go to Member Dashboard</Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
