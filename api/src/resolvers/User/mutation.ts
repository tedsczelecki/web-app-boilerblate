import { arg, mutationField, nonNull } from 'nexus'
import { Context } from '../../context'
import {
  compareUserPassword,
  createUserToken,
  getUserPassword,
} from '../..//lib/auth'

export const signupUser = mutationField('signupUser', {
  type: 'UserAuthResponse',
  args: {
    data: nonNull(
      arg({
        type: 'UserCreateInput',
      }),
    ),
  },
  resolve: async (_, { data }, { prisma }: Context) => {
    const { email, password: rawPassword, username } = data

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new Error('The email is already in use')
    }

    const password = await getUserPassword(rawPassword)

    const user = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    })
    try {
      const token = await createUserToken(user.id)
      return { token }
    } catch (e) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      })
      throw new Error(e)
    }
  },
})

export const login = mutationField('loginUser', {
  type: 'UserAuthResponse',
  args: {
    data: nonNull(
      arg({
        type: 'UserLoginInput',
      }),
    ),
  },
  resolve: async (_, { data }, { prisma }: Context) => {
    const { email, password } = data

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error(
        'Email and/or password does not match anything in the system',
      )
    }

    const passwordMatch = await compareUserPassword({
      hash: user.password,
      password,
    })

    if (!passwordMatch) {
      throw new Error(
        'Email and/or password does not match anything in the system',
      )
    }

    try {
      const token = await createUserToken({ email: user.email, id: user.id })
      return { token }
    } catch (e) {
      throw new Error(e)
    }
  },
})
