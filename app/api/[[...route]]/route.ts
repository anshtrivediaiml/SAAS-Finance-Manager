import {Hono} from 'hono';
import {handle} from 'hono/vercel'
import accounts from './accounts';
import  categories  from './categories';
import transactions from './transactions';
export const runtime= 'edge';
import summary from './summary';
const app= new Hono().basePath('/api')

const routes=app.route('/accounts',accounts)
 //All the accounts  routes will be forwared to the accounts file
 .route('/categories',categories)
 //All the categories routes will be forwarded to the categories file
.route('/transactions',transactions)
//Al the transaction routes will be forwarded to the transactions.ts file from here 
.route('/summary',summary)
//All the summary routes will be forwarded to the summary.ts file from this route

export const GET = handle(app);
export const POST = handle(app);
export const PATCH= handle(app);
export const DELETE=handle(app);
export type AppType = typeof routes;