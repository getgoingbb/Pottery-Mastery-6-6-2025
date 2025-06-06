-- Users table for NextAuth.js
CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL,
  "sessionToken" VARCHAR(255) NOT NULL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  role VARCHAR(50) DEFAULT 'user',
  "hasPurchased" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Course-specific tables
CREATE TABLE IF NOT EXISTS course_progress (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "videoId" VARCHAR(50) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  "completedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("userId", "videoId")
);

CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  "stripePaymentId" VARCHAR(255),
  status VARCHAR(50) DEFAULT 'completed',
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS accounts_userId_idx ON accounts("userId");
CREATE INDEX IF NOT EXISTS sessions_userId_idx ON sessions("userId");
CREATE INDEX IF NOT EXISTS sessions_sessionToken_idx ON sessions("sessionToken");
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS course_progress_userId_idx ON course_progress("userId");
CREATE INDEX IF NOT EXISTS purchases_userId_idx ON purchases("userId");

-- Insert your admin user
INSERT INTO users (name, email, role, "hasPurchased") 
VALUES ('Brent', 'brent@globalnow.biz', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;

-- Insert demo user
INSERT INTO users (name, email, role, "hasPurchased") 
VALUES ('John Doe', 'john@example.com', 'user', TRUE)
ON CONFLICT (email) DO NOTHING;
