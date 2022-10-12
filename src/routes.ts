import Router from 'koa-router';

import * as games from './controllers/games';
import * as hunches from './controllers/hunches';
import * as users from './controllers/users';

export const router = new Router();

/// USERS
//creating a new user
router.post('/users', users.createUser);
//getting all users
router.get('/users', users.getUsers);
//updating a user
router.put('/users', users.updateUser);
//deleting user
router.delete('/users', users.deleteUser);

///LOGIN
//loging into dashboard/profile
router.get('/login', users.userLogin);

/// HUNCHES
//creating or updating a new hunch
router.post('/hunches', hunches.createUpdateHunch);
//getting all hunches
router.get('/hunches', hunches.getHunches);
//deleting hunch
router.delete('/hunches', hunches.deleteHunch);

/// GAMES
//getting a game by date
router.get('/games', games.getGamesByDate);
//deleting game
// router.delete('/games', games.deleteGame);
