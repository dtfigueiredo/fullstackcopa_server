import { PrismaClient } from '@prisma/client'
import { addDays, formatISO } from 'date-fns'
import { Context } from 'koa'

const prisma = new PrismaClient()

//getting all games or by filtered date
export const getGamesByDate = async (ctx: Context) => {
  const filteredGameDate: string = String(ctx.request.query.gameHour)

  //if filteredGameDate exists where = filter ; {}
  const where = filteredGameDate
    ? {
        gameHour: {
          gte: filteredGameDate,
          lt: formatISO(addDays(new Date(filteredGameDate), 1)),
        },
      }
    : {}

  try {
    const games = await prisma.game.findMany({ where })
    ctx.body = games
    ctx.status = 200
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}

//updating game
// export const updateGame = async (ctx: Context) => {
//   const data: any = {
//     id: ctx.request.body?.id,
//     name: ctx.request.body?.name,
//     username: ctx.request.body?.username,
//     email: ctx.request.body?.email,
//     password: ctx.request.body?.password,
//   };

//   try {
//     const user = await prisma.user.update({
//       where: { id: data.id },
//       data: data,
//     });
//     ctx.body = user;
//   } catch (error) {
//     ctx.body = error;
//     ctx.status = 500;
//   }
// };

//deleting game
export const deleteGame = async (ctx: Context) => {
  const data: any = {
    id: ctx.request.body?.id,
  }

  try {
    await prisma.game.delete({ where: { id: data.id } })
    ctx.body = `Jogo: ${data.id} deletado com sucesso.`
  } catch (error) {
    ctx.body = error
    ctx.status = 500
  }
}
