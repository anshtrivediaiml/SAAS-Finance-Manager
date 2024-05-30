//This code is used to migrate the actual database table from a drizzle folder to the neon database and any changes in the schema or data will be also changed. The migrate function is used to apply the schema to the database, creating the necessary tables and relationships. This ensures that the database schema is up to date with the application's requirements.

//  This file is made so that we can store the database and the tables into the drizzle folder from the drizzle.ts file.
//By Writing dg:generate the sql query or migration script is first created in the drizzle folder  then we write db:migrate to migrate the changes to actual neon database  and then db:drizzle-studio to visualize the database in the drizzle studio
import { neon } from "@neondatabase/serverless";
import {config} from "dotenv"
import { drizzle } from "drizzle-orm/neon-http";
import {migrate} from "drizzle-orm/neon-http/migrator";

config({path:".env.local"});

const sql= neon(process.env.DATABASE_URL!);
const db=drizzle(sql);

const main = async()=>{
    try{
     await migrate(db,{migrationsFolder:"drizzle"});
    }catch(err){
        console.error("Error in migration",err)
        process.exit(1);

    }
};

main();