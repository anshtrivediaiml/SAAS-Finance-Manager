import { useNewAccount } from "../hooks/use-new-accounts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";




const FormSchema = insertAccountSchema.pick({
  name:true,
});
type FormValues= z.input<typeof FormSchema>;


export const NewAccountSheet = () => {
  
  const { isOpen,onClose } = useNewAccount();

  const mutation=useCreateAccount(); //This is the useCreateAccount hook which is used to create a new account and it is imported from the use-create-account.ts file and it uses hono and tanstack query for api routing and returns a mutation which will say whether account is created or not .

//The onSubmit function receives the form values from the account-form and passes it further to the api endpoint /accounts in form of a post request. 
  const onSubmit=(values:FormValues)=>{
    mutation.mutate(values,{
      onSuccess:()=>{onClose()},
    
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} 
        // If we would specify onSubmit={()=>onSubmit} then it wont work}
        disabled={mutation.isPending}
        defaultValues={{name:""}}/>
      </SheetContent>
    </Sheet>
  );
};
