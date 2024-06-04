'use client'

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu" 
import { DeleteIcon, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useConfirm } from "@/hooks/use-confirm";


type Props={
    id:string;
}
export const Actions=({id}:Props)=>{
    const [ConfirmationDialog,confirm]=useConfirm('Are you sure?','You are about to delete this account');
    const deleteMutation= useDeleteAccount(id);
    const {onOpen}=useOpenAccount();

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