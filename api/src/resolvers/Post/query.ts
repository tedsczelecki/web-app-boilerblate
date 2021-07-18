import {
  arg,
  intArg,
  list,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from 'nexus'
import { Context } from '../../context'
import { isUserAuthenticated } from '../../lib/auth'

export const postById = queryField('postById', {
  type: 'Post',
  args: {
    id: intArg(),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.post.findUnique({
      where: { id: args.id || undefined },
    })
  },
})

export const feed = queryField('posts', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    searchString: stringArg(),
    skip: intArg(),
    take: intArg(),
    orderBy: arg({
      type: 'PostOrderByUpdatedAtInput',
    }),
  },
  authorize: isUserAuthenticated,
  resolve: async (_parent, args, { me, prisma }: Context) => {
    const or = args.searchString
      ? {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        }
      : {}

    const result = await prisma.post.findMany({
      where: {
        ...or,
        authorId: me?.id,
      },
      include: {
        author: true,
      },
      take: args.take || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    })
    return result
  },
})

export const draftsByUser = queryField('draftsByUser', {
  type: nonNull(list(nonNull('Post'))),
  args: {
    userUniqueInput: nonNull(
      arg({
        type: 'UserUniqueInput',
      }),
    ),
  },
  resolve: (_parent, args, context: Context) => {
    return context.prisma.user
      .findUnique({
        where: {
          id: args.userUniqueInput.id || undefined,
          email: args.userUniqueInput.email || undefined,
        },
      })
      .posts({
        where: {
          published: false,
        },
      })
  },
})
