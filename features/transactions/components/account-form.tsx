//This form is only for creating the name of the account
import {z} from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertAccountSchema } from '@/db/schema';
import { Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from '@/components/ui/form';

//This is the form schema for the account name imported for the insertAccountSchema
const FormSchema = insertAccountSchema.pick({
    name:true,
});

//This is the form values for the account name
type FormValues= z.input<typeof FormSchema>;

type Props={
    id?:string;
    defaultValues?:FormValues;
    onSubmit:(values:FormValues)=>void;
    onDelete?:()=>void;
    disabled?:boolean;
}

export const AccountForm=({id,defaultValues,onSubmit,onDelete,disabled}:Props)=>{

    const form=useForm<FormValues>({
        resolver:zodResolver(FormSchema),
        defaultValues,
    }); //It only uses name from the account schema so the values are only for the name of the account and we are using the zodResolver to validate the form schema for the account name 

    const handleSubmit =(values:FormValues)=>{
       onSubmit(values);
    }

    const handleDelete=()=>{
        onDelete?.();
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
        <FormField name="name" 
        control={form.control} 
        render={({field})=>(<FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input disabled={disabled} placeholder="e.g. Cash,Bank,Credit Card" {...field}/>
                 {/* //Inside the {...field} all the event handlers are handled by the UseForm library if we wouldnt have spread it we would have to use onChange={(e)=>{setValue(e.target.value)} type of event handlers but field does all of that */} 
            </FormControl>
        </FormItem>)}>
        </FormField>
        <Button>
            {id? "Save Changes":"Create Account"}
        </Button>
      {/* id is turned into boolean by specifying !! before it 👇🏻*/}
        { !!id && (<Button 
         type="button" //This type="button" is specified because inside the form the default type is submit so if we dont specify the type as button it will submit the form
          disabled={disabled}
           onClick={handleDelete} className='w-full' variant="outline">
            <Trash className='size-4 mr-2'></Trash>
            <span> Delete Account</span>
        </Button>)}
        </form>
        </Form>
    )
}
