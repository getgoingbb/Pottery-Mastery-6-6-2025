"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"

  useEffect(() => {
    // If the user is not authenticated and we're not loading, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
    }

    // If admin is required but user is not admin, redirect to dashboard
    if (!isLoading && isAuthenticated && requireAdmin && !isAdmin) {
      router.push("/dashboard")
    }
  }, [isLoading, isAuthenticated, isAdmin, requireAdmin, router])

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated || (requireAdmin && !isAdmin)) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // If authenticated (and admin if required), render children
  return <>{children}</>
}
