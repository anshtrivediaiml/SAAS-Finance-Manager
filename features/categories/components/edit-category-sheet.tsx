import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenCategory} from "../hooks/use-open-category";
import { CategoryForm } from "./category-form";
import { z } from "zod";
import { insertCategorySchema } from "@/db/schema";
import { useGetIndividualCategory } from "../api/use-get-individual-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory} from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const FormSchema = insertCategorySchema.pick({
  name:true,
});
type FormValues= z.input<typeof FormSchema>;


export const EditCategorySheet = () => {
  
  const { isOpen,onClose,id } = useOpenCategory();

  const [ConfirmationDialog,confirm]=useConfirm(
    'Are you sure?',
    'You are about to delete this category'
  )

  const categoryQuery= useGetIndividualCategory(id);
   const editMutation=useEditCategory(id);
   const deleteMutation=useDeleteCategory(id);
   const isPending=editMutation.isPending || deleteMutation.isPending;
  

const isLoading= categoryQuery.isLoading;
//The onSubmit function receives the form values from the category-form and passes it further to the api endpoint /categories in form of a post request. 
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

  const defaultValues= categoryQuery.data?{
    name:categoryQuery.data.name,
  }:{name:""};
  
  return (
    <>
    <ConfirmationDialog/>
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>
          Edit an existing category
          </SheetDescription>
        </SheetHeader>
        {isLoading ?
        (<div className="absolute inset-0 flex items-center">
         <Loader2 className="size-4 text-muted-foreground"/>
        </div>)
        :
        <CategoryForm 
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
