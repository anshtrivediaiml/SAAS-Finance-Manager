import {z} from 'zod';
import {Hono} from 'hono';
import {db} from '@/db/drizzle'; //importing the db from the drizzle file
import { accounts, insertAccountSchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import { drizzle } from 'drizzle-orm/neon-http';
import {eq,and, inArray} from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
//This file is made for the as for the api endpoint that when an api get request is made to the /accounts then all the accounts stored in the database are fetched and returned as a response to the route.ts file 
import {createId} from '@paralleldrive/cuid2' //importing the createId function from the cuid2 package to create a unique id for the accounts


const app = new Hono()
.get('/',
clerkMiddleware(),
async (c)=>{

    const auth= getAuth(c);//getting the authentication details from the clerk auth whether the user is authenticated or not
    if(!auth?.userId){
        return c.json({error:"Unauthorized"},401);
    }
  const data =await db.select({
    id:accounts.id,
    name:accounts.name,
  }).from(accounts)
  .where(eq(accounts.userId,auth.userId))
  //fetching all the accounts from the database  
  return c.json({data});
})
.post('/', 
clerkMiddleware(), //checking if the user is authenticated or not
zValidator('json',insertAccountSchema.pick({
    name:true,
}))//validating that the post request should have the same schema as the insertAccountSchema
,async (c)=>{
    const auth=getAuth(c);
    const values= c.req.valid('json');
    if(!auth?.userId){
        return c.json({error:"Unauthorized"},401);
    }
 const [data] = await db.insert(accounts).values({
    id:createId(),
    userId:auth.userId,
    ...values,
 }).returning()

return c.json({data});
})
.post('/bulk-delete',
clerkMiddleware(),
zValidator('json'
  ,z.object({
    ids:z.array(z.string())
  })
),
async (c)=>{
  const auth=getAuth(c);
  const values= c.req.valid('json');
  if(!auth?.userId){
      return c.json({error:"Unauthorized"},401);
  }

  const data = await db.delete(accounts).
  where(and( eq(accounts.userId,auth.userId),inArray(accounts.id,values.ids)))
  .returning({id:accounts.id,});

  return c.json({data});
}
);
export default app; 