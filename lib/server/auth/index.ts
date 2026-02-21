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
import { Prisma } from '@prisma/client'

export const auth = betterAuth({
  database: prismaAdapter(PrismaService, {
    provider: 'postgresql',
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'fenix'],
    },
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
      authMeta: {
        type: 'json',
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: isSamePassword,
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
    username({
      minUsernameLength: 2,
    }),
    nextCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("USERRRRRRR", user)
          if(user.role != "Student" && user.role != "Staff") return;

          const meta = user.authMeta as any;

          await PrismaService.studentDetails.upsert({
            where: { userId: user.id },
            update: {
              university: meta ? meta.university : "",
              course: meta ? meta.course : "",
            },
            create: {
              userId: user.id,
              university: meta ? meta.university : "",
              course: meta ? meta.course : "",
            },
          })

          if(meta) {
            await PrismaService.user.update({
              where: { id: user.id },
              data: { authMeta: Prisma.DbNull },
            })
          }
        },
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session