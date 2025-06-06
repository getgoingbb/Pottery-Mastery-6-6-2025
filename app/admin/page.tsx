"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoManager from "@/components/admin/video-manager"
import AuthGuard from "@/app/components/auth-guard"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import UserManagement from "@/components/admin/user-management"

export default function AdminPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Pottery Mastery Admin</h1>
            <div className="flex items-center gap-4">
              {session?.user && (
                <span className="text-gray-600">
                  Welcome, {session.user.name} ({session.user.email})
                </span>
              )}
              <Button variant="outline" onClick={handleLogout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="videos">
            <TabsList className="mb-8">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="videos">
              <VideoManager />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="sales">
              <div className="p-8 text-center text-gray-500">
                <p>Sales reports and analytics will be implemented here.</p>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="p-8 text-center text-gray-500">
                <p>Site settings and configuration will be implemented here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AuthGuard>
  )
}
