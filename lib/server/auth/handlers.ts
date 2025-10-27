import { FenixRegistration, Role } from './types'
import { displayName } from '../utils'
import { Course, instituitions } from '@/data/courses'

const FENIX_ACCESS_TOKEN_ENDPOINT =
  'https://fenix.tecnico.ulisboa.pt/oauth/access_token'

function getMostRecentRegistration(registrations?: FenixRegistration[]) {
  if (!registrations) return
  if (registrations.length == 0) return

  const sortedRegistrations = registrations.sort(
    (a, b) => parseInt(a.id) - parseInt(b.id)
  )

  return sortedRegistrations[0]
}

function findCourse(instituitionId: string, name: string): Course | undefined {
  if (!Object.keys(instituitions).includes(instituitionId)) return

  const courses = instituitions[instituitionId].courses

  let course = undefined
  Object.keys(courses).forEach((courseId) => {
    if (name.includes(courses[courseId].name)) {
      course = courses[courseId]
    }
  })

  return course
}

function getFenixCourseCode(institutionCode: string, roles: Role[]) {
  const studentRole = roles.find((role) => role.type === 'STUDENT')
  const alumniRole = roles.find((role) => role.type === 'ALUMNI')

  // Get most recent registration, if any
  let mostRecentRegistration = undefined
  const studentRegistration = getMostRecentRegistration(
    studentRole?.registrations
  )
  const alumniRegistration = getMostRecentRegistration(
    alumniRole?.concludedRegistrations
  )

  if (studentRegistration && alumniRegistration) {
    mostRecentRegistration =
      parseInt(studentRegistration.id) > parseInt(alumniRegistration.id)
        ? studentRegistration
        : alumniRegistration
  } else {
    mostRecentRegistration = studentRegistration ?? alumniRegistration
  }

  if (!mostRecentRegistration) return ''

  return findCourse(institutionCode, mostRecentRegistration.name)?.code ?? ''
}

/* Fenix Handlers */

/*export const FenixAccessTokenHandler: TokenEndpointHandler = {
  url: FENIX_ACCESS_TOKEN_ENDPOINT,
  async request(context) {
    if (!context.params.code) throw new Error('Fenix OAuth Error: Missing code')

    const authCode = context.params.code
    const tokenRequestUrl = new URL(FENIX_ACCESS_TOKEN_ENDPOINT)

    tokenRequestUrl.searchParams.append('client_id', process.env.FENIX_ID!)
    tokenRequestUrl.searchParams.append(
      'client_secret',
      process.env.FENIX_SECRET!
    )
    tokenRequestUrl.searchParams.append('redirect_uri', process.env.FENIX_URL!)
    tokenRequestUrl.searchParams.append('code', authCode)
    tokenRequestUrl.searchParams.append('grant_type', 'authorization_code')

    // Request access token
    const response = await fetch(tokenRequestUrl, {
      method: 'POST',
      mode: 'cors',
    })

    if (!response.ok)
      throw new Error(`Fenix OAuth Error: ${response.statusText}`)

    // Decode response
    const json = await response.json()

    const tokens = {
      access_token: json['access_token'],
      refresh_token: json['refresh_token'],
    }

    return { tokens }
  },
}*/

export const FenixProfileHandler: any = (profile: any) => {
  const institutionCode = profile.campus === 'Taguspark' ? '1519' : '1518'

  return {
    id: profile.username,
    name: displayName(profile.name),
    email: profile.email,
    studentDetails: {
      create: {
        university: institutionCode,
        course: getFenixCourseCode(institutionCode, profile.roles),
      },
    },
  }
}

/* Google Handlers */

export const GoogleProfileHandler: any = (profile: any) => {
  return {
    id: profile.sub
  }
}