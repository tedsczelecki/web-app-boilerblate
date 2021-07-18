import { default as postResolvers } from './Post'
import { default as userResolvers } from './User'
import { asNexusMethod, enumType } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

const Query = {
  ...postResolvers.Query,
  ...userResolvers.Query,
}

const Mutation = {
  ...postResolvers.Mutation,
  ...userResolvers.Mutation,
}

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

export default [DateTime, Query, Mutation, SortOrder]
