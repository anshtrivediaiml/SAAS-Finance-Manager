import {pgTable, text} from "drizzle-orm/pg-core"
import {createInsertSchema} from 'drizzle-zod'
export const accounts= pgTable("accounts",{
    id: text("id").primaryKey(),
    plaidId:text("plaid_id"),
    name:text("name").notNull(),
    userId:text("user_id").notNull()
})

export const insertAccountSchema= createInsertSchema(accounts); //Creating the insert schema for the accounts table it will write a query to insert the data into the accounts table and on db:generate it will be stored in the drizzle folder and db:migrate will migrate the changes to the actual neon database 