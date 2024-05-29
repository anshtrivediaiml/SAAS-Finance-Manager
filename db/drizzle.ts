import { neon } from '@neondatabase/serverless'; //importing neon from the neondatabase package to connect to the database
import { drizzle } from 'drizzle-orm/neon-http'; //importing drizzle from the drizzle-orm package to use the drizzle-orm functions because we are using the drizzle-orm package to interact with the database
import { accounts } from './schema'; //importing the accounts table from the schema file

 export const sql = neon(process.env.DATABASE_URL!); //connecting to the database using the DATABASE_URL environment variable
export const db = drizzle(sql); //connecting to the database using the drizzle-orm package


const accounts_all = db.select().from(accounts); //selecting all the accounts from the accounts table in the database