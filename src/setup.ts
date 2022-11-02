import 'dotenv/config'

import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'

import { router } from './routes'

export const app = new Koa()

//middlewares
app.use(cors())
app.use(bodyParser())
app.use(json())
app.use(logger())
//routes
app.use(router.routes())
app.use(router.allowedMethods())
