import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CategoryForm } from "./category-form";
import { useNewCategory } from "../hooks/use-new-category";
import { z } from "zod";
import { insertCategorySchema } from "@/db/schema";
import { useCreateCategory } from "../api/use-create-category";




const FormSchema = insertCategorySchema.pick({
  name:true,
});
type FormValues= z.input<typeof FormSchema>;


export const NewCategorySheet = () => {
  
  const { isOpen,onClose } = useNewCategory();

  const mutation=useCreateCategory(); //This is the useCreateCategory hook which is used to create a new category and it is imported from the use-create-category.ts file and it uses hono and tanstack query for api routing and returns a mutation which will say whether category is created or not .

//The onSubmit function receives the form values from the category-form and passes it further to the api endpoint /categories in form of a post request. 
  const onSubmit=(values:FormValues)=>{
    mutation.mutate(values,{
      onSuccess:()=>{onClose()},
    
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} 
        // If we would specify onSubmit={()=>onSubmit} then it wont work}
        disabled={mutation.isPending}
        defaultValues={{name:""}}/>
      </SheetContent>
    </Sheet>
  );
};
