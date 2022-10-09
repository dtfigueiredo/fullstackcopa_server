import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const games = [
  {
    gameHour: '2022-11-20T16:00:00Z',
    teamA: 'cat',
    teamB: 'equ',
  },
  {
    gameHour: '2022-11-21T13:00:00Z',
    teamA: 'ing',
    teamB: 'ira',
  },
  {
    gameHour: '2022-11-21T16:00:00Z',
    teamA: 'sen',
    teamB: 'hol',
  },
  {
    gameHour: '2022-11-21T19:00:00Z',
    teamA: 'eua',
    teamB: 'gal',
  },
  {
    gameHour: '2022-11-22T10:00:00Z',
    teamA: 'arg',
    teamB: 'ara',
  },
  {
    gameHour: '2022-11-22T13:00:00Z',
    teamA: 'din',
    teamB: 'tun',
  },
  {
    gameHour: '2022-11-22T16:00:00Z',
    teamA: 'mex',
    teamB: 'pol',
  },
  {
    gameHour: '2022-11-22T19:00:00Z',
    teamA: 'fra',
    teamB: 'aus',
  },
  {
    gameHour: '2022-11-23T10:00:00Z',
    teamA: 'mar',
    teamB: 'cro',
  },
  {
    gameHour: '2022-11-23T13:00:00Z',
    teamA: 'ale',
    teamB: 'jap',
  },
  {
    gameHour: '2022-11-23T16:00:00Z',
    teamA: 'esp',
    teamB: 'cos',
  },
  {
    gameHour: '2022-11-23T19:00:00Z',
    teamA: 'bel',
    teamB: 'can',
  },
  {
    gameHour: '2022-11-24T10:00:00Z',
    teamA: 'sui',
    teamB: 'cam',
  },
  {
    gameHour: '2022-11-24T13:00:00Z',
    teamA: 'uru',
    teamB: 'cor',
  },
  {
    gameHour: '2022-11-24T16:00:00Z',
    teamA: 'por',
    teamB: 'gan',
  },
  {
    gameHour: '2022-11-24T19:00:00Z',
    teamA: 'bra',
    teamB: 'ser',
  },
  {
    gameHour: '2022-11-25T10:00:00Z',
    teamA: 'gal',
    teamB: 'ira',
  },
  {
    gameHour: '2022-11-25T13:00:00Z',
    teamA: 'cat',
    teamB: 'sen',
  },
  {
    gameHour: '2022-11-25T16:00:00Z',
    teamA: 'hol',
    teamB: 'equ',
  },
  {
    gameHour: '2022-11-25T19:00:00Z',
    teamA: 'ing',
    teamB: 'eua',
  },
  {
    gameHour: '2022-11-26T10:00:00Z',
    teamA: 'tun',
    teamB: 'aus',
  },
  {
    gameHour: '2022-11-26T13:00:00Z',
    teamA: 'pol',
    teamB: 'ara',
  },
  {
    gameHour: '2022-11-26T16:00:00Z',
    teamA: 'fra',
    teamB: 'din',
  },
  {
    gameHour: '2022-11-26T19:00:00Z',
    teamA: 'arg',
    teamB: 'mex',
  },
  {
    gameHour: '2022-11-27T10:00:00Z',
    teamA: 'jap',
    teamB: 'cos',
  },
  {
    gameHour: '2022-11-27T13:00:00Z',
    teamA: 'bel',
    teamB: 'mar',
  },
  {
    gameHour: '2022-11-27T16:00:00Z',
    teamA: 'cro',
    teamB: 'can',
  },
  {
    gameHour: '2022-11-27T19:00:00Z',
    teamA: 'esp',
    teamB: 'sui',
  },
  {
    gameHour: '2022-11-28T10:00:00Z',
    teamA: 'cam',
    teamB: 'ser',
  },
  {
    gameHour: '2022-11-28T13:00:00Z',
    teamA: 'cor',
    teamB: 'gan',
  },
  {
    gameHour: '2022-11-28T16:00:00Z',
    teamA: 'bra',
    teamB: 'sui',
  },
  {
    gameHour: '2022-11-28T19:00:00Z',
    teamA: 'por',
    teamB: 'uru',
  },
  {
    gameHour: '2022-11-29T15:00:00Z',
    teamA: 'equ',
    teamB: 'sen',
  },
  {
    gameHour: '2022-11-29T15:00:00Z',
    teamA: 'hol',
    teamB: 'cat',
  },
  {
    gameHour: '2022-11-29T19:00:00Z',
    teamA: 'gal',
    teamB: 'ing',
  },
  {
    gameHour: '2022-11-29T19:00:00Z',
    teamA: 'ira',
    teamB: 'eua',
  },
  {
    gameHour: '2022-11-30T15:00:00Z',
    teamA: 'aus',
    teamB: 'din',
  },
  {
    gameHour: '2022-11-30T15:00:00Z',
    teamA: 'tun',
    teamB: 'fra',
  },
  {
    gameHour: '2022-11-30T19:00:00Z',
    teamA: 'pol',
    teamB: 'arg',
  },
  {
    gameHour: '2022-11-30T19:00:00Z',
    teamA: 'ara',
    teamB: 'mex',
  },
  {
    gameHour: '2022-12-01T15:00:00Z',
    teamA: 'cro',
    teamB: 'bel',
  },
  {
    gameHour: '2022-12-01T15:00:00Z',
    teamA: 'can',
    teamB: 'mar',
  },
  {
    gameHour: '2022-12-01T19:00:00Z',
    teamA: 'jap',
    teamB: 'esp',
  },
  {
    gameHour: '2022-12-01T19:00:00Z',
    teamA: 'cos',
    teamB: 'ale',
  },
  {
    gameHour: '2022-12-02T15:00:00Z',
    teamA: 'gan',
    teamB: 'uru',
  },
  {
    gameHour: '2022-12-02T15:00:00Z',
    teamA: 'cor',
    teamB: 'por',
  },
  {
    gameHour: '2022-12-02T19:00:00Z',
    teamA: 'ser',
    teamB: 'sui',
  },
  {
    gameHour: '2022-12-02T19:00:00Z',
    teamA: 'cam',
    teamB: 'bra',
  },
];

const main = async () => {
  await prisma.game.createMany({
    data: games,
  });
};

main();
