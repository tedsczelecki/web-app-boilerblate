import { objectType, queryField } from 'nexus'
import { Context } from '../../context'

export const getMe = queryField('getMe', {
  type: 'User',
  resolve: async (_parent, _args, { me, prisma }: Context) => {
    const user = await prisma.user.findUnique({
      where: {
        id: me?.id,
      },
    })

    if (user) {
      const { password, ...userData } = user
      return userData
    }

    return null
  },
})

export const allUsers = queryField('allUsers', {
  type: 'User',
  resolve: (_parent, _args, context: Context) => {
    return context.prisma.user.findMany()
  },
})
