import Router from 'koa-router';
import { PrismaClient } from '@prisma/client';

export const router = new Router();
const prisma = new PrismaClient();

const users: Array<{ username: string }> = [];

router.get('/users', async (ctx, next) => {
  ctx.body = users;
});

router.post('/users', async (ctx, next) => {
  const user = {
    username: `${ctx.request.body?.username}`,
  };

  users.push(user);

  ctx.body = user;
});
