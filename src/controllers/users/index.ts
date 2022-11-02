import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'

const prisma = new PrismaClient()

export const createUser = async (ctx: Context) => {
  //ecrypt password
  const plainPassword: string = String(ctx.request.body?.password)
  const password = await bcrypt.hash(plainPassword, 10)

  const data: any = {
    name: ctx.request.body?.name,
    username: ctx.request.body?.username,
    email: ctx.request.body?.email,
    password,
  }

  try {
    const { password, ...user } = await prisma.user.create({ data })
    ctx.body = {
      message: `Usuário criado com sucesso.`,
      user,
    }
    ctx.status = 201
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//getting all users
export const getUsers = async (ctx: Context) => {
  try {
    const users = await prisma.user.findMany()

    const usersReturn = users.map((user) => {
      const { password, ...restUser } = user
      return restUser
    })

    ctx.body = usersReturn
    ctx.status = 200
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//updating user
export const updateUser = async (ctx: Context) => {
  const data: any = {
    id: ctx.request.body?.id,
    name: ctx.request.body?.name,
    username: ctx.request.body?.username,
    email: ctx.request.body?.email,
    password: ctx.request.body?.password,
  }

  try {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: data,
    })
    ctx.body = {
      message: 'Ususário atualizado com sucesso',
      user,
    }
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//deleting user
export const deleteUser = async (ctx: Context) => {
  const data: any = {
    id: ctx.request.body?.id,
  }

  try {
    await prisma.user.delete({ where: { id: data.id } })
    ctx.body = `Usuário: ${data.id} deletado com sucesso.`
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//user login
export const userLogin = async (ctx: Context) => {
  //getting the token64 from the authorization header
  const tokenAuth: string = String(ctx.headers.authorization?.split(' ').pop())
  //destructuring the token64 in two vars
  const [email, plainTextPassword] = atob(tokenAuth).split(':')

  //finding the user
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    ctx.status = 401
    ctx.body = `Usuário não encontrado.`
    return
  }

  //comparing pwd
  const pwdMatch = await bcrypt.compare(plainTextPassword, user.password)

  if (!pwdMatch) {
    ctx.status = 401
    ctx.body = `Senhas não conferem.`
    return
  }

  //user information after 'login'
  const { password, ...resultUser } = user

  //jwt secret key from .env
  const privateKey: string = String(process.env.SECRET_KEY)

  const tokenJwt = jwt.sign(
    {
      sub: user.id,
      name: user.name,
    },
    privateKey,
    { expiresIn: '7d' }
  )

  ctx.body = {
    message: 'Usuário logado com sucesso',
    user: resultUser,
    accessToken: tokenJwt,
  }
}
