import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.transactions[':id']['$delete']>;

export const useDeleteTransaction =(id?:string)=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error>
(
{mutationFn: async ()=>{
 const response = await client.api.transactions[':id']['$delete']({
     param:{id},
 })
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Transaction deleted successfully");
    queryClient.invalidateQueries({queryKey:['transaction',{id}]});
    queryClient.invalidateQueries({queryKey:['transactions']});
    queryClient.invalidateQueries({queryKey:['summary']});
    
 //It will refetch all transactions and summary everytime you create a new transaction as in the use-get-transactions.ts file we have specified the queryKey as ["transactions"] and ["summary"] and in use-get-summary.ts we have specified the queryKey as ["summary"]
},
onError:()=>{
toast.error("Failed to delete transaction");
},
});
return mutation;
};