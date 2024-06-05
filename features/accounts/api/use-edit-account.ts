import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.accounts[':id']['$patch']>;

type RequestType= InferRequestType<typeof client.api.accounts[':id']['$patch']>['json'];


export const useEditAccount =(id?:string)=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error,RequestType>
(
{mutationFn: async (json)=>{
 const response = await client.api.accounts[':id']['$patch']({
     param:{id},
    json,
 })
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Account updated successfully");
    queryClient.invalidateQueries({queryKey:['account',{id}]});
    queryClient.invalidateQueries({queryKey:['accounts']});
    queryClient.invalidateQueries({queryKey:['transactions']});
    //TODO:Invalidate summary and transactions

    //It will refetch all accounts everytime you create a new account as in the use-get-accounts.ts file we have specified the queryKey as ["accounts"]
},
onError:()=>{
toast.error("Failed to edit account");
},
});
return mutation;
};