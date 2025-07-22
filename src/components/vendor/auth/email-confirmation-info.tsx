"use client"

import { Shield, CheckCircle, Zap, Users } from "lucide-react"

export default function EmailConfirmationInfo() {
  return (
    <div className="flex items-center justify-center p-6 lg:p-8 bg-gradient-to-br from-emerald-600 to-blue-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-md space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Secure Your Account</h2>
          <p className="text-xl text-emerald-100">
            Email verification helps protect your vendor account and ensures secure communication.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Account Security</h3>
              <p className="text-emerald-100">
                Verify your email to enable two-factor authentication and secure account recovery.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Trusted Vendor Status</h3>
              <p className="text-emerald-100">Verified vendors get priority placement and customer trust badges.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Instant Notifications</h3>
              <p className="text-emerald-100">Get real-time alerts for orders, messages, and important updates.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Join 10,000+ Verified Vendors</span>
          </div>
          <p className="text-emerald-100 text-sm">
            Our verified vendor community generates over $2M in monthly sales. Start your journey today!
          </p>
        </div>
      </div>
    </div>
  )
}
