import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.accounts[':id']['$delete']>;

export const useDeleteAccount =(id?:string)=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error>
(
{mutationFn: async ()=>{
 const response = await client.api.accounts[':id']['$delete']({
     param:{id},
 })
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Account deleted successfully");
    queryClient.invalidateQueries({queryKey:['account',{id}]});
    queryClient.invalidateQueries({queryKey:['accounts']});
    //TODO:Invalidate summary and transactions

    //It will refetch all accounts everytime you create a new account as in the use-get-accounts.ts file we have specified the queryKey as ["accounts"]
},
onError:()=>{
toast.error("Failed to delete account");
},
});
return mutation;
};