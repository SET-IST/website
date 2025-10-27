import { createAuthClient } from "better-auth/react"
import { genericOAuthClient, usernameClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { auth } from '@/lib/server/auth'

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [
    genericOAuthClient(),
    usernameClient(),
    inferAdditionalFields<typeof auth>()
  ]
})

export const { signIn, signOut, useSession } = authClient
export type Session = typeof authClient.$Infer.Session
export type User = Session extends { user: infer U } ? U : never;