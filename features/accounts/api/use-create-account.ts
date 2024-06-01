import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.accounts.$post>;

type RequestType= InferRequestType<typeof client.api.accounts.$post>['json'];


export const useCreateAccount =()=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error,RequestType>
(
{mutationFn: async (json)=>{
 const response = await client.api.accounts.$post({json});   
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Account created successfully");
    queryClient.invalidateQueries({queryKey:['accounts']});
    //It will refetch all accounts everytime you create a new account as in the use-get-accounts.ts file we have specified the queryKey as ["accounts"]
},
onError:()=>{
toast.error("Failed to create account");
},
});
return mutation;
};