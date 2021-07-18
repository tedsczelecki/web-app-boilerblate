import { makeSchema, fieldAuthorizePlugin } from 'nexus'
import { Context } from './context'
import resolvers from './resolvers'

import types from './types'

export const schema = makeSchema({
  types: [...resolvers, ...types],
  outputs: {
    schema: __dirname + '/../../@types/model-types.gen.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  plugins: [fieldAuthorizePlugin()],
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
