import {z} from 'zod'
import {integer,timestamp, pgTable, text} from "drizzle-orm/pg-core"
import {createInsertSchema} from 'drizzle-zod'
import { relations } from "drizzle-orm";

export const accounts= pgTable("accounts",{
    id: text("id").primaryKey(),
    plaidId:text("plaid_id"),
    name:text("name").notNull(),
    userId:text("user_id").notNull()
})

export const accountRelations= relations(accounts,({many})=>({
    transactions:many(transactions)
})); //Creating the relation between the accounts and transactions table so that we can fetch the transactions related to the account

export const insertAccountSchema= createInsertSchema(accounts); //Creating the insert schema for the accounts table it will write a query to insert the data into the accounts table and on db:generate it will be stored in the drizzle folder and db:migrate will migrate the changes to the actual neon database 

export const categories= pgTable("categories",{
    id: text("id").primaryKey(),
    plaidId:text("plaid_id"),
    name:text("name").notNull(),
    userId:text("user_id").notNull()
});

export const categoriesRelations=relations(categories,({many})=>({
    transactions:many(transactions)
}))//Creating the relation between the categories and transactions table so that we can fetch the transactions related to the category

export const insertCategorySchema= createInsertSchema(categories); //Creating the insert schema for the categories table it will write a query to insert the data into the categories table and on db:generate it will be stored in the drizzle folder and db:migrate will migrate the changes to the actual neon database

export const transactions = pgTable("transactions",{
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee:text('payee').notNull(),
    notes:text('notes'),
    date:timestamp('date',{mode:'date'}).notNull(),
    accountId:text('account_id').references(()=>accounts.id, {
        onDelete:'cascade',
    }).notNull(), //Foreign key reference to the accounts table
    categoryId:text('category_id').references
    (()=>categories.id,{
        onDelete:'set null',
    }),//Foreign key reference to the categories table
}); 
//Creating the transactions table schema

export const TransactionRelations=relations(transactions,({one})=>({
    account:one(accounts,{
        fields:[transactions.accountId],
        references : [accounts.id],
}),
categories:one(categories,{
    fields:[transactions.categoryId],
    references : [categories.id],
}),
}));
 //Creating the relation between the transactions and accounts table by one to many relation with accounts and categories table   

 export const InsertTransactionSchema= createInsertSchema(transactions,{
    date:z.coerce.date(),
});