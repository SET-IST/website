import { betterAuth } from 'better-auth'
import { genericOAuth, username } from 'better-auth/plugins'
import { nextCookies } from "better-auth/next-js";
import bcrypt from "bcrypt"

// Handlers and Callbacks
import {
  FenixProfileHandler,
  GoogleProfileHandler,
} from './handlers'

// Database adapter
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaService } from '@/core/services/server/prisma'
import { hashPassword, isSamePassword } from '@/core/utils/auth'

export const auth = betterAuth({
  database: prismaAdapter(PrismaService, {
    provider: 'sqlite',
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "fenix"]
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      readChangelog: {
        type: 'string',
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: isSamePassword
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      accessType: 'offline',
      prompt: 'consent',
      mapProfileToUser: GoogleProfileHandler,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: 'fenix',
          clientId: process.env.FENIX_ID!,
          clientSecret: process.env.FENIX_SECRET!,
          userInfoUrl: 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person',
          authorizationUrl: 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog',
          tokenUrl: 'https://fenix.tecnico.ulisboa.pt/oauth/access_token',
          mapProfileToUser: FenixProfileHandler,
        },
      ],
    }),
    username(),
    nextCookies(),
  ],
})

export type Session = typeof auth.$Infer.Session