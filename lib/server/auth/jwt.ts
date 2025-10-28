import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
//import { JWTOptions, decode, encode } from 'next-auth/jwt'

/* 

Wait, JWT? Do we use this? No

NextAuth apparently discourages users from creating their own user 
store and using password based authentication as a main route as well 
as the inherent complications with securing and supporting password validation.

How to bypass this?

We must manipulate the output from the JWT encode to not returned the JWT signed 
tokens that would encapsulate the user data but instead return the sessionToken 
value instead that references our database sessions table.

https://github.com/nextauthjs/next-auth/discussions/4394

*/

/*export const JWTHandlers = (
  req: NextApiRequest,
  res: NextApiResponse
): Partial<JWTOptions> => {
  const options: Partial<JWTOptions> = {
    encode: async ({ token, secret, maxAge }) => {
      if (
        req.query.nextauth?.includes('callback') &&
        req.query.nextauth.includes('credentials') &&
        req.method === 'POST'
      ) {
        const cookies = new Cookies(req, res)
        const cookie = cookies.get('next-auth.session-token')
        if (cookie) return cookie
        else return ''
      }
      return encode({ token, secret, maxAge })
    },
    decode({ token, secret }) {
      if (
        req.query.nextauth?.includes('callback') &&
        req.query.nextauth.includes('credentials') &&
        req.method === 'POST'
      ) {
        return null
      }

      return decode({ token, secret })
    },
  }

  return options
}
*/