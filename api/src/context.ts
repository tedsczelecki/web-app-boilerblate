import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'
import { verifyToken } from './lib/auth'

export interface Context {
  prisma: PrismaClient
  me: User | null
}

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log(`Params: ${e.params}`)
  console.log('Duration: ' + e.duration + 'ms')
})

const getMe = async ({ req }) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.substring('Bearer '.length)

    if (token) {
      try {
        const { id } = await verifyToken(token)
        const user = await prisma.user.findUnique({
          where: {
            id: id,
          },
        })
        console.log('USER??', user)
        return user as User
      } catch (e) {
        // throw new AuthenticationError(
        //   'Your session expired. Sign in again.',
        // );
        return null
      }
    }
  }
}

export const context = async (args): Promise<Context> => {
  const me = await getMe(args)
  return {
    me,
    prisma,
  }
}
