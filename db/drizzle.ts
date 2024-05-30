//This file helps in connecting to the neon database serverless and using the drizzle-orm package to interact with the database



import { neon } from '@neondatabase/serverless';  //The neon function is used to create a connection to a Neon database using a serverless approach, which is typically used in cloud environments to handle database connections efficiently.
import { drizzle } from 'drizzle-orm/neon-http';  //The drizzle function is used to create an ORM instance that can interact with the Neon database. Drizzle ORM provides a type-safe way to construct and execute SQL queries.

import * as schema from './schema'; //importing everything from the schema file

 export const sql = neon(process.env.DATABASE_URL!); //connecting to the neon database using the DATABASE_URL environment variable

export const db = drizzle(sql,{schema}); //The drizzle function is called with the sql connection object. The resulting db constant is an ORM instance that you can use to interact with your database in a type-safe manner. It allows you to define and execute SQL queries, interact with tables, and perform CRUD (Create, Read, Update, Delete) operations.


