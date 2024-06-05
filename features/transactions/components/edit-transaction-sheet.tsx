import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction"; 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "./transaction-form";
import { z } from "zod";
import { InsertTransactionSchema } from "@/db/schema";
import { useGetIndividualTransaction } from "@/features/transactions/api/use-get-individual-transaction";
import { Loader2 } from "lucide-react";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const FormSchema = InsertTransactionSchema.omit({
id:true,
});
type FormValues= z.input<typeof FormSchema>;


export const EditTransactionSheet = () => {
  
  const { isOpen,onClose,id } = useOpenTransaction();

  const [ConfirmationDialog,confirm]=useConfirm(
    'Are you sure?',
    'You are about to delete this transaction'
  )

  const transactionQuery= useGetIndividualTransaction(id);
   const editMutation=useEditTransaction(id);
   const deleteMutation=useDeleteTransaction(id);


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

   const isPending=editMutation.isPending || deleteMutation.isPending
   || transactionQuery.isLoading || categoryMutation.isPending || AccountMutation.isPending;
  

const isLoading= transactionQuery.isLoading || categoryQuery.isLoading ||AccountQuery.isLoading;
//The onSubmit function receives the form values from the account-form and passes it further to the api endpoint /accounts in form of a post request. 
  const onSubmit=(values:FormValues)=>{
    editMutation.mutate(values,{
      onSuccess:()=>{onClose()},
    
    });
  };

  const onDelete= async ()=>{
    const ok= await confirm();
    if(ok){
      deleteMutation.mutate(undefined,{
        onSuccess:()=>{onClose()},
      });
    }
  };

  const defaultValues= transactionQuery.data?{
    accountId:transactionQuery.data.accountId,
    categoryId:transactionQuery.data.categoryId,
    amount:transactionQuery.data.amount.toString(),
    date:transactionQuery.data.date? new Date(transactionQuery.data.date):new Date(),
    payee:transactionQuery.data.payee,
    notes:transactionQuery.data.notes,
  }:{
    accountId:'',
    categoryId:'',
    amount:'',
    date:new Date(),
  payee:'',
  notes:'',
  };
  
  return (
    <>
    <ConfirmationDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Transaction</SheetTitle>
          <SheetDescription>
          Edit an existing transaction
          </SheetDescription>
        </SheetHeader>
        {isLoading ?
        (<div className="absolute inset-0 flex items-center">
         <Loader2 className="size-4 text-muted-foreground"/>
        </div>)
        :
        <TransactionForm
        id={id}
          onSubmit={onSubmit}
          onDelete={onDelete}
          defaultValues={defaultValues}
          disabled={isPending}
          categoryOptions={categoryOptions}
           onCreateCategory={onCreateCategory}
           onCreateAccount={onCreateAccount}
           accountOptions={AccountOptions}
          />
        }
        
      </SheetContent>
    </Sheet>
    </>
  );
};
