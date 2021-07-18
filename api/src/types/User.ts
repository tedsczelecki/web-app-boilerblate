import { inputObjectType, objectType } from 'nexus'
import { Context } from '../context'

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('username')
    t.string('password')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent, _, context: Context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    })
  },
})

const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.string('username')
    t.list.nonNull.field('posts', { type: 'PostCreateInput' })
  },
})

const UserAuthResponse = objectType({
  name: 'UserAuthResponse',
  definition(t) {
    t.nonNull.string('token')
  },
})

const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

export default [
  User,
  UserAuthResponse,
  UserCreateInput,
  UserLoginInput,
  UserUniqueInput,
]
