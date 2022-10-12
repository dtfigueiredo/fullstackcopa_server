import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';

const prisma = new PrismaClient();

//TODO fix to type secret later
const privateKey: any = process.env.SECRET_KEY;

//creating hunch
export const createUpdateHunch = async (ctx: Context) => {
  //receiving the jwt token
  const token: any = ctx.headers.authorization?.split(' ').pop();

  //validating the jwt token
  try {
    //trying to create hunch based on the id returned from the token
    const tokenData = jwt.verify(token, privateKey);

    //validating both teams score input
    if (!ctx.request.body?.teamAScore && !ctx.request.body?.teamBScore) {
      ctx.body = `Ambos os dados de placar devem ser incluídos!`;
      ctx.status = 400;
      return;
    }

    //
    const userId: any = tokenData.sub;
    const { gameId, teamAScore, teamBScore } = ctx.request.body;
    const data: any = { userId, gameId, teamAScore, teamBScore };

    try {
      //search for an existing game based on the pair userId|gameId
      const hunch = await prisma.hunch.findFirst({
        where: { userId, gameId: data.gameId },
      });
      ctx.body = hunch
        ? await prisma.hunch.update({
            //if the search returns a game, update it
            where: { id: hunch.id },
            data: { teamAScore: data.teamAScore, teamBScore: data.teamBScore },
          })
        : await prisma.hunch.create({
            //if the search doesn't return a game, create it
            data,
          });
    } catch (error) {
      ctx.body = error;
      console.log(ctx.body);
      ctx.status = 500;
    }
    //
  } catch (error) {
    ctx.body = error;
    ctx.status = 401;
    return;
  }
};

//getting all hunches
export const getHunches = async (ctx: Context) => {
  try {
    const hunches = await prisma.hunch.findMany();
    ctx.body = hunches;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};

//deleting hunch
export const deleteHunch = async (ctx: Context) => {
  const data: any = {
    id: ctx.request.body?.id,
  };

  try {
    await prisma.hunch.delete({ where: { id: data.id } });
    ctx.body = `Palpite: ${data.id} deletado com sucesso.`;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
};
