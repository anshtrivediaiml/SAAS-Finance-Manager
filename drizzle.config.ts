//Used for configuring the drizzle to connect to the neon postgres
import {config} from "dotenv"
import { defineConfig } from "drizzle-kit"

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