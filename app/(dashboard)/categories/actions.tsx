'use client'

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu" 
import { DeleteIcon, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";


type Props={
    id:string;
}
export const Actions=({id}:Props)=>{
    const [ConfirmationDialog,confirm]=useConfirm('Are you sure?','You are about to delete this category');
    const deleteMutation= useDeleteCategory(id);
    const {onOpen}=useOpenCategory();

    const handleDelete=async()=>{
    const ok= await confirm();
    if(ok){
        deleteMutation.mutate();
    }; 
}
    return (
        <>
        <ConfirmationDialog/>
         <DropdownMenu >
            <DropdownMenuTrigger asChild>
               <Button  variant="ghost" className="size-8 p-0">
                 <MoreHorizontal className="size-4"/>
               </Button>
            </DropdownMenuTrigger>
     <DropdownMenuContent>
        <DropdownMenuItem 
        disabled={deleteMutation.isPending}
        onClick={()=>{onOpen(id)}}
        >
            <Edit2 className="size-4 mr-2"/>
            Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
        disabled={deleteMutation.isPending}
        onClick={handleDelete}
        >
            <Trash2 className="size-4 mr-2"/>
            Delete
        </DropdownMenuItem>
     </DropdownMenuContent>
         </DropdownMenu>
        </>
    )
}