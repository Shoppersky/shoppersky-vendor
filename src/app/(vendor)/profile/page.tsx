"use client"

import Header from "../../../components/Header"
import ProfilePage from "../../../components/profile-page"

export default function Profile() {
  // Example user data - replace with your actual user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    role: "Admin"
  }

  return (
    <div className="min-h-screen">
      <Header user={user} />
      <ProfilePage />
    </div>
  )
}
