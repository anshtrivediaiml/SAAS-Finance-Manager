import { useOpenAccount } from "../hooks/use-open-account";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./transaction-form";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { useGetIndividualAccount } from "../api/use-get-individual-transaction";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-transaction";
import { useDeleteAccount } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

const FormSchema = insertAccountSchema.pick({
  name:true,
});
type FormValues= z.input<typeof FormSchema>;


export const EditAccountSheet = () => {
  
  const { isOpen,onClose,id } = useOpenAccount();

  const [ConfirmationDialog,confirm]=useConfirm(
    'Are you sure?',
    'You are about to delete this account'
  )

  const accountQuery= useGetIndividualAccount(id);
   const editMutation=useEditAccount(id);
   const deleteMutation=useDeleteAccount(id);
   const isPending=editMutation.isPending || deleteMutation.isPending;
  

const isLoading= accountQuery.isLoading;
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

  const defaultValues= accountQuery.data?{
    name:accountQuery.data.name,
  }:{name:""};
  
  return (
    <>
    <ConfirmationDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>
          Edit an existing account
          </SheetDescription>
        </SheetHeader>
        {isLoading ?
        (<div className="absolute inset-0 flex items-center">
         <Loader2 className="size-4 text-muted-foreground"/>
        </div>)
        :
        <AccountForm 
         id={id}
        onSubmit={onSubmit} 
        // If we would specify onSubmit={()=>onSubmit} then it wont work}
        disabled={isPending}
        defaultValues={defaultValues}
        onDelete={onDelete}
        />
        }
        
      </SheetContent>
    </Sheet>
    </>
  );
};
