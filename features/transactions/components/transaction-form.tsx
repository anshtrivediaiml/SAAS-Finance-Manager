//This form is only for creating the name of the account
import {z} from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InsertTransactionSchema, insertAccountSchema } from '@/db/schema';
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from '@/components/ui/form';
import { Select } from '@/components/select';
import { DatePicker } from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { AmountInput } from '@/components/amount-input';
import { convertAmountToMiliUnits } from '@/lib/utils';
//This is the form schema for the account name imported for the insertAccountSchema
const FormSchema = z.object({
    date:z.coerce.date(),
    accountId:z.string(),
    categoryId:z.string().nullable().optional(),
    payee:z.string(),
    amount:z.string(),
    notes:z.string().nullable().optional()
});

const ApiSchema = InsertTransactionSchema.omit({
    id:true,
})

//This is the form values for the account name
type FormValues= z.input<typeof FormSchema>;
type ApiFormValues=z.input<typeof ApiSchema>;
type Props={
    id?:string;
    defaultValues?:FormValues;
    onSubmit:(values:ApiFormValues)=>void;
    onDelete?:()=>void;
    disabled?:boolean;
    accountOptions:{label:string; value:string}[];
    categoryOptions:{label:string; value:string}[];
    onCreateAccount:(name:string)=>void;
    onCreateCategory:(name:string)=>void;
}

export const TransactionForm=({id,defaultValues,onSubmit,onDelete,disabled,accountOptions,categoryOptions,onCreateAccount,onCreateCategory}:Props)=>{

    const form=useForm<FormValues>({
        resolver:zodResolver(FormSchema),
        defaultValues,
    }); //It only uses name from the account schema so the values are only for the name of the account and we are using the zodResolver to validate the form schema for the account name 

    const handleSubmit =(values:FormValues)=>{
      const amountInMiliUnits= convertAmountToMiliUnits(parseFloat(values.amount));

      onSubmit({
        ...values,
        amount:amountInMiliUnits,
      })
    };

    const handleDelete=()=>{
        onDelete?.();
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
         
        <FormField name="date" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormControl>
               <DatePicker 
               value={field.value}
               onChange={field.onChange}
               disabled={disabled}
               />
            </FormControl>
        </FormItem>)}/>


        <FormField name="accountId" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Account</FormLabel>
            <FormControl>
                <Select 
                placeholder='Select an account'
                options={accountOptions}
                onCreate={onCreateAccount}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                />
            </FormControl>
        </FormItem>)}/>
       
    <FormField name="categoryId" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Select 
                placeholder='Select a category'
                options={categoryOptions}
                onCreate={onCreateCategory}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                /> 
            </FormControl>
        </FormItem>)}/>

<FormField name="payee" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Payee</FormLabel>
            <FormControl>
               <Input
                disabled={disabled}
                placeholder='Add a payee'
                {...field}
                />
            </FormControl>
        </FormItem>)}/>

        <FormField name="amount" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
               <AmountInput
                {...field}
                disabled={disabled}
                placeholder={(Intl.NumberFormat('en-IN',{style:'currency',currency:'INR'}).format(0))}
                />
            </FormControl>
        </FormItem>)}/>
            

        <FormField name="notes" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
               <Textarea
                {...field}
                disabled={disabled}
                value={field.value ??''}
                placeholder='Optional notes'
                />
            </FormControl>
        </FormItem>)}/>
            
        
       
        <Button className='w-full' disabled={disabled}>
            {id ? "Save Changes":"Create Transaction"}
        </Button>
      {/* id is turned into boolean by specifying !! before it 👇🏻*/}
        { !!id && (<Button 
         type="button" //This type="button" is specified because inside the form the default type is submit so if we dont specify the type as button it will submit the form
          disabled={disabled}
           onClick={handleDelete} className='w-full' variant="outline">
            <Trash className='size-4 mr-2'></Trash>
            <span> Delete Transaction</span>
        </Button>)}
        </form>
        </Form>
    )
}
