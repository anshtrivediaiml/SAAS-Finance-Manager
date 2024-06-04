import { useNewTransaction } from "../hooks/use-new-transaction";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { InsertTransactionSchema } from "@/db/schema";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";




const FormSchema = InsertTransactionSchema.omit({
  id:true,
});
type FormValues= z.input<typeof FormSchema>;


export const NewTransactionSheet = () => {
  
  const { isOpen,onClose } = useNewTransaction();

  const mutation=useCreateTransaction(); //This is the useCreateTransaction hook which is used to create a new transaction and it is imported from the use-create-transaction.ts file and it uses hono and tanstack query for api routing and returns a mutation which will say whether transaction is created or not .

//The onSubmit function receives the form values from the transacction-form and passes it further to the api endpoint /transactions in form of a post request. 

const categoryQuery= useGetCategories();
const categoryMutation=useCreateCategory();
const onCreateCategory=(name:string)=> categoryMutation.mutate({name});

const categoryOptions= (categoryQuery.data?? []).map((category)=>({
  label:category.name,
  value:category.id,
}))


const AccountQuery= useGetAccounts();
const AccountMutation=useCreateAccount();
const onCreateAccount=(name:string)=> AccountMutation.mutate({name});

const AccountOptions= (AccountQuery.data?? []).map((account)=>({
  label:account.name,
  value:account.id,
}))

const isPending=mutation.isPending || categoryMutation.isPending || AccountMutation.isPending;

const isLoading= categoryQuery.isLoading || 
AccountQuery.isLoading;

  const onSubmit=(values:FormValues)=>{
    mutation.mutate(values,{
      onSuccess:()=>{onClose()},
    
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Add a new transaction.
          </SheetDescription>
        </SheetHeader>
        {isLoading ?(
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin"/>
          </div>
        ) : (  
          <TransactionForm
          onSubmit={onSubmit}
          disabled={isPending}
          categoryOptions={categoryOptions}
           onCreateCategory={onCreateCategory}
           onCreateAccount={onCreateAccount}
           accountOptions={AccountOptions}
          />
        ) }
       
      </SheetContent>
    </Sheet>
  );
};
