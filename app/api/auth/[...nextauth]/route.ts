import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { createServerClient } from "@/lib/supabase"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Demo credentials check
        const demoUsers = [
          { email: "brent@globalnow.biz", password: "admin123", role: "admin", name: "Brent" },
          { email: "john@example.com", password: "password123", role: "user", name: "John Doe" },
        ]

        const demoUser = demoUsers.find(
          (user) =>
            user.email.toLowerCase() === credentials.email.toLowerCase() && user.password === credentials.password,
        )

        if (!demoUser) {
          return null
        }

        // Get or create user in Supabase
        try {
          const supabase = createServerClient()

          // First try to get existing user
          const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .single()

          let user = existingUser

          // If user doesn't exist, create them
          if (!user) {
            const { data: newUser, error } = await supabase
              .from("users")
              .insert([
                {
                  email: credentials.email,
                  name: demoUser.name,
                  role: demoUser.role,
                  has_purchased: true,
                },
              ])
              .select()
              .single()

            if (error) {
              console.error("Error creating user:", error)
              // Return demo user even if database fails
              return {
                id: demoUser.email === "brent@globalnow.biz" ? "admin-1" : "user-1",
                name: demoUser.name,
                email: demoUser.email,
                role: demoUser.role,
                hasPurchased: true,
              }
            }
            user = newUser
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            hasPurchased: user.has_purchased,
          }
        } catch (error) {
          console.error("Database error:", error)
          // Return demo user data even if database fails
          return {
            id: demoUser.email === "brent@globalnow.biz" ? "admin-1" : "user-1",
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
            hasPurchased: true,
          }
        }
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.hasPurchased = user.hasPurchased
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.hasPurchased = token.hasPurchased
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
