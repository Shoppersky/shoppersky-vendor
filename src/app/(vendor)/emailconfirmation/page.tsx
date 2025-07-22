"use client"

import Link from "next/link"
import { CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EmailConfirmationInfo from "@/components/vendor/auth/email-confirmation-info"

export default function EmailConfirmation() {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <EmailConfirmationInfo />

      {/* Email Confirmation Side */}
      <div className="flex items-center justify-center p-6 lg:p-8 relative">
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-purple-400 to-emerald-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse delay-500"></div>

        <div className="mx-auto w-full max-w-md space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Check Your Email!
            </h1>
            <p className="text-lg text-gray-600">We've sent you a confirmation link to activate your vendor account.</p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Confirm your email address</h2>
                <p className="text-gray-500 mt-1">Almost there! Just one more step to get started</p>
              </div>

              {/* Success Message */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <p className="text-sm font-medium">A fresh confirmation link has been sent to your email address.</p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Please check your email and click the confirmation link to activate your vendor account.
                </p>

                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-4">Didn't receive the email?</p>
                  <Link href="/vendor/resend-confirmation">
                    <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                      Resend Confirmation Email
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Remember your login details?{" "}
                  <Link
                    href="/vendor/login"
                    className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors"
                  >
                    Sign In Here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
