import { PrismaService } from '@/core/services/server'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Cookies from 'cookies'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import { NextApiRequest, NextApiResponse } from 'next'
/*import { CallbacksOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import { getFullResourcePath } from '@/lib/server/utils'

const adapter = PrismaAdapter(PrismaService) as Adapter

export const AuthCallbacks = (
  req: NextApiRequest,
  res: NextApiResponse
): Partial<CallbacksOptions> => {
  const callbacks: Partial<CallbacksOptions> = {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'credentials' && user) {
        // Initialize session

        const sessionToken = randomUUID()

        const sessionExpiry = DateTime.now().plus({ months: 1 }).toJSDate()

        await adapter.createSession!({
          sessionToken: sessionToken,
          userId: user.id,
          expires: sessionExpiry,
        })

        const cookies = new Cookies(req, res)

        cookies.set('next-auth.session-token', sessionToken, {
          expires: sessionExpiry,
        })
      }
      return true
    },
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        id: user.id,
        role: user.role,
        readChangelog: user.readChangelog,
        image: getFullResourcePath(user.image),
      }

      return session
    },
  }

  return callbacks
}
*/