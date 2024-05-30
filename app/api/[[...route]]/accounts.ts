import {Hono} from 'hono';
import {db} from '@/db/drizzle'; //importing the db from the drizzle file
import { accounts } from '@/db/schema';

const app = new Hono().get('/',async (c)=>{
  const data =await db.select({
    id:accounts.id,
    name:accounts.name,
  }).from(accounts); 
  //fetching all the accounts from the database  
  return c.json(data);
})

export default app; 