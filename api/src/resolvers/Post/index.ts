import { draftsByUser, feed, postById } from './query'
import * as Mutation from './mutation'

export default {
  Query: { draftsByUser, feed, postById },
  Mutation,
}
