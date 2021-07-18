import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { jwtPayload } from '../../../admin/src/@types'
import { Context } from '../context'

const secret = process?.env?.SECRET ?? 'rebel'

export const compareUserPassword = ({
  hash,
  password,
}: {
  hash: string
  password: string
}) => bcrypt.compare(password, hash)

export const createUserToken = ({
  email,
  id,
}: {
  email: string
  id: number
}) => {
  return jwt.sign({ id, email }, secret, {
    expiresIn: '1yr',
  })
}

export const getUserPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const isUserAuthenticated = (_, __, { me }: Context) => (me?.id ?? 0) > 0

export const verifyToken = async (token: string): Promise<jwtPayload> => {
  return jwt.verify(token, secret) as Promise<jwtPayload>
}
