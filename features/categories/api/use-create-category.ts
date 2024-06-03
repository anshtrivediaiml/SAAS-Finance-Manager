import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.categories.$post>;

type RequestType= InferRequestType<typeof client.api.categories.$post>['json'];


export const useCreateCategory =()=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error,RequestType>
(
{mutationFn: async (json)=>{
 const response = await client.api.categories.$post({json});   
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Category created successfully");
    queryClient.invalidateQueries({queryKey:['categories']});
    //It will refetch all categories everytime you create a new category as in the use-get-categories.ts file we have specified the queryKey as ["categories"]
},
onError:()=>{
toast.error("Failed to create category");
},
});
return mutation;
};