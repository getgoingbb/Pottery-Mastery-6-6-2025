// This is a mock authentication utility
// In a real app, you would use a proper authentication system like NextAuth.js or Auth.js

// Mock user database
export const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, passwords would be hashed
    role: "user",
    hasPurchased: true,
  },
  {
    id: "2",
    name: "Brent",
    email: "brent@globalnow.biz",
    password: "admin123", // In a real app, passwords would be hashed
    role: "admin",
    hasPurchased: true,
  },
]

// Mock authentication function
export async function authenticateUser(email: string, password: string) {
  // In a real app, this would check against a database and use proper password hashing
  const user = MOCK_USERS.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password)

  if (!user) {
    return { success: false, message: "Invalid credentials" }
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      hasPurchased: user.hasPurchased,
    },
  }
}

// Mock function to check if user is admin
export function isAdmin(user: any) {
  return user?.role === "admin"
}
