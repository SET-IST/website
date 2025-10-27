import { NextApiRequest, NextApiResponse } from 'next'
import {
  NextFunction,
  UnauthorizedException,
  createMiddlewareDecorator,
} from 'next-api-decorators'
import { auth, Session } from '@/lib/server/auth'
import { headers } from 'next/headers'

export async function getSession(req: NextApiRequest, res: NextApiResponse): Promise<Session | null> {
  return await auth.api.getSession({
    headers: {
      cookie: req.headers.cookie ?? "",
    }
  })
}

export const RequiresSession = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getSession(req, res)

    if (!session) {
      throw new UnauthorizedException('User not logged in')
    }
    
    req.headers.user = JSON.stringify(session.user)
    next()
  }
)
