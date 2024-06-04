import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import {client} from '@/lib/hono';

type ResponseType =InferResponseType<typeof client.api.transactions['bulk-delete']['$post']>;

type RequestType= InferRequestType<typeof client.api.transactions['bulk-delete']['$post']>['json'];


export const useBulkDeleteTransactions =()=>{


const queryClient= useQueryClient();

const mutation=useMutation<ResponseType,Error,RequestType>
(
{mutationFn: async (json)=>{
 const response = await client.api.transactions['bulk-delete'].$post({json});   
 return await response.json(); 
},
onSuccess:()=>{
    toast.success("Transactions deleted successfully ");
    queryClient.invalidateQueries({queryKey:['transactions']});
    //TODO:Also Invalidate summary
    //It will refetch all transactions everytime you create a new transaction as in the use-get-transactions.ts file we have specified the queryKey as ["transactions"]
},
onError:()=>{
toast.error("Failed to delete transactions");
},
});
return mutation;
};