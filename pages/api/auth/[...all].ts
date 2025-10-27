import { auth } from '@/lib/server/auth'
import { toNodeHandler } from 'better-auth/node'

export const config = { api: { bodyParser: false } }

export default toNodeHandler(auth.handler)