import {
  arg,
  intArg,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { Context } from '../../context'

export const updatePostById = mutationField('postById', {
  type: 'Post',
  args: {
    data: nonNull(
      arg({
        type: 'PostUpdateInput',
      }),
    ),
  },
  resolve: async (_, args, { me, prisma }: Context) => {
    let { id, title, content } = args?.data ?? {}

    if (id) {
      await prisma.post.updateMany({
        where: {
          author: {
            id: me?.id,
          },
          id,
        },
        data: {
          content,
          title,
        },
      })
    } else {
      const post = await prisma.post.create({
        data: {
          author: {
            connect: {
              id: me?.id,
            },
          },
          content,
          title,
        },
      })
      id = post.id
    }

    return await prisma.post.findUnique({
      where: {
        id,
      },
    })
  },
})

export const incrementPostViewCount = mutationField('incrementPostViewCount', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: (_, args, context: Context) => {
    return context.prisma.post.update({
      where: { id: args.id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })
  },
})

export const deletePost = mutationField('deletePostById', {
  type: 'Post',
  args: {
    id: nonNull(intArg()),
  },
  resolve: async (_, { id }, { me, prisma }: Context) => {
    const post = await prisma.post.findMany({
      where: {
        id,
        authorId: me?.id,
      },
    })

    if (!post?.[0]) {
      throw new Error('This post does not exist')
    }

    await prisma.post.deleteMany({
      where: {
        id,
        author: {
          id: me?.id,
        },
      },
    })

    return post[0]
  },
})
