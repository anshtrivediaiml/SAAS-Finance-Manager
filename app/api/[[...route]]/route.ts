import {Hono} from 'hono';
import {handle} from 'hono/vercel'
import { zValidator } from '@hono/zod-validator';
import {z} from 'zod'; //Importing zod which will act as a middleware for the request body validation
import { clerkMiddleware,getAuth } from '@hono/clerk-auth'; //importing this to use the clerkMiddleware and getAuth function from the clerk-auth package when a user is authenticated or not
import accounts from './accounts';

export const runtime= 'edge';
const app= new Hono().basePath('/api')

const routes=app.route('/accounts',accounts) //All the routes will be forwared to the accounts file


export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;