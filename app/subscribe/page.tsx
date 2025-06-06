import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="text-amber-600 font-medium mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Lifetime Access to Pottery Mastery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete your purchase below to gain immediate access to all 7 pottery tutorial videos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Enter your details to create your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password</Label>
                    <Input id="password" type="password" required />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-4">Payment Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
                  <Link href="/thank-you">Complete Purchase - $29.99</Link>
                </Button>
              </CardFooter>
            </Card>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Pottery Mastery Course</span>
                      <span className="font-medium">$99.99</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Special Discount</span>
                      <span>-$70.00</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>$29.99</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-medium mb-4">What You'll Get</h3>
                    <ul className="space-y-3">
                      <BenefitItem text="Immediate access to all 7 pottery tutorial videos" />
                      <BenefitItem text="Lifetime updates and new content" />
                      <BenefitItem text="HD quality streaming" />
                      <BenefitItem text="Watch on any device" />
                      <BenefitItem text="Downloadable resources" />
                      <BenefitItem text="Certificate of completion" />
                    </ul>
                  </div>

                  <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <p className="text-amber-800 font-medium">
                      This is a one-time payment. No recurring charges or hidden fees.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 bg-white p-4 rounded-lg border">
                <h3 className="font-medium mb-2">100% Satisfaction Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  If you're not completely satisfied with your purchase, contact us within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
