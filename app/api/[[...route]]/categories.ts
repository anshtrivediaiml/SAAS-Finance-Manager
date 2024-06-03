import {z} from 'zod';
import {Hono} from 'hono';
import {db} from '@/db/drizzle'; //importing the db from the drizzle file
import { categories,insertCategorySchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import { drizzle } from 'drizzle-orm/neon-http';
import {eq,and, inArray} from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
//This file is made for the as for the api endpoint that when an api get request is made to the /categories then all the categories stored in the database are fetched and returned as a response to the route.ts file 
import {createId} from '@paralleldrive/cuid2' //importing the createId function from the cuid2 package to create a unique id for the categories


const app = new Hono()
.get('/',
clerkMiddleware(),
async (c)=>{

    const auth= getAuth(c);//getting the authentication details from the clerk auth whether the user is authenticated or not
    if(!auth?.userId){
        return c.json({error:"Unauthorized"},401);
    }
  const data =await db.select({
    id:categories.id,
    name:categories.name,
  }).from(categories)
  .where(eq(categories.userId,auth.userId))
  //fetching all the categories from the database  
  return c.json({data});
})
.get('/:id'
  ,zValidator('param',z.object({
    id:z.string().optional()
  })),
  clerkMiddleware(),
  async(c)=>{
    const auth= getAuth(c);
    const {id}= c.req.valid('param');
    
    if(!id){
      return c.json({error:"Missing Id"},400);}

      if(!auth?.userId){
        return c.json({error:"Unauthorized"},401);
      }

      const [data]= await db.select({
        id:categories.id,
        name:categories.name,
      }).from(categories) //Fetching the account from the database
      .where(and(
        eq(categories.userId,auth?.userId),
        eq(categories.id,id)
      ));

      if(!data){
        return c.json({"error":"Not Found"},404);
      }
      return c.json({data});
    } 
)
.post('/', 
clerkMiddleware(), //checking if the user is authenticated or not
zValidator('json',insertCategorySchema.pick({
    name:true,
}))//validating that the post request should have the same schema as the insertcategorieschema
,async (c)=>{
    const auth=getAuth(c);
    const values= c.req.valid('json');
    if(!auth?.userId){
        return c.json({error:"Unauthorized"},401);
    }
 const [data] = await db.insert(categories).values({
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

  const data = await db.delete(categories).
  where(and( eq(categories.userId,auth.userId),inArray(categories.id,values.ids)))
  .returning({id:categories.id,});

  return c.json({data});
}
)
.patch('/:id',
  clerkMiddleware(),
  zValidator('param',z.object({
    id:z.string().optional()
  })),
  zValidator('json',insertCategorySchema.pick({
    name:true,
  })),
  async(c)=>{
    const auth=getAuth(c);
    const {id}= c.req.valid('param');
    const values=c.req.valid('json');

    if(!id){
      return c.json({error:"Missing Id"},400)
    }
    if(!auth?.userId){
      return c.json({error:"Unauthorized"},401);
    }
      const [data]= await db.update(categories)
      .set(values)
      .where(and(
        eq(categories.userId,auth.userId),
        eq(categories.id,id)
      ),
    ).returning();
    
    if(!data){
      return c.json({error:"Not Found"},404);
    }
    return c.json({data});



    }
)
.delete('/:id',
  clerkMiddleware(),
  zValidator('param',z.object({
    id:z.string().optional()
  })),
  async(c)=>{
    const auth=getAuth(c);
    const {id}= c.req.valid('param');
    
    if(!id){
      return c.json({error:"Missing Id"},400)
    }
    if(!auth?.userId){
      return c.json({error:"Unauthorized"},401);
    }
      const [data]= await db.delete(categories)
      .where(and(
        eq(categories.userId,auth.userId),
        eq(categories.id,id)
      ),
    ).returning({id:categories.id});
    
    if(!data){
      return c.json({error:"Not Found"},404);
    }
    return c.json({data});

    }
)
export default app; 