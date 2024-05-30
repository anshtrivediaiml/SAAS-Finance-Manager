//Used for configuring the drizzle to connect to the neon postgres
import {config} from "dotenv"
import { defineConfig } from "drizzle-kit"

//This file is made so that when we run db:drizzle-studio in the terminal, the drizzle studio is opened in the browser and we can visualize the database schema and tables in the drizzle studio but for that we need configuration which is done in this file 

config({path:".env.local"}); 
//The config function reads the .env.local file and loads the variables into process.env. This allows the application to use these variables, such as the database connection string, securely and flexibly.

export default defineConfig({
    schema: "./db/schema.ts",
    out:"./drizzle",
    driver:"pg",
    dbCredentials:{
        connectionString:process.env.DATABASE_URL!,
    },
    verbose:true,
    strict:true
})