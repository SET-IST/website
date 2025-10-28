import { CreateContextOptions } from '@edgestore/server/adapters/next/pages'
import { getSession } from '@/lib/server/middleware'

export type Context = {
  userId?: string
  objectId?: string
}

export async function createContext({
  req,
  res,
}: CreateContextOptions): Promise<Context> {
  const session = await getSession(req, res)

  return {
    userId: session?.user?.id,
  }
}
