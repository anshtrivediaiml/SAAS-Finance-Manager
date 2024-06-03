import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.categories[':id']['$delete']>;

export const useDeleteCategory =(id?:string)=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error>
(
{mutationFn: async ()=>{
 const response = await client.api.categories[':id']['$delete']({
     param:{id},
 })
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Category deleted successfully");
    queryClient.invalidateQueries({queryKey:['category',{id}]});
    queryClient.invalidateQueries({queryKey:['categories']});
    //TODO:Invalidate summary and transactions

    //It will refetch all categories everytime you create a new category as in the use-get-categories.ts file we have specified the queryKey as ["categories"]
},
onError:()=>{
toast.error("Failed to delete category");
},
});
return mutation;
};