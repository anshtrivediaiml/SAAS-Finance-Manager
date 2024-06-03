import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.categories['bulk-delete']['$post']>;

type RequestType= InferRequestType<typeof client.api.categories['bulk-delete']['$post']>['json'];


export const useBulkDeleteCategories =()=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error,RequestType>
(
{mutationFn: async (json)=>{
 const response = await client.api.categories['bulk-delete'].$post({json});   
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("categories deleted successfully ");
    queryClient.invalidateQueries({queryKey:['categories']});
    //TODO:Also Invalidate summary
    //It will refetch all categories everytime you create a new category as in the use-get-categories.ts file we have specified the queryKey as ["categories"]
},
onError:()=>{
toast.error("Failed to delete categories");
},
});
return mutation;
};