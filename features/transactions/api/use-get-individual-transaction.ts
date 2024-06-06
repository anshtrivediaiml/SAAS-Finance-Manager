//In this file we will be going to create accounts hook 
//The file will directly communicate with the accounts.ts get endpoint  
import { useQuery } from "@tanstack/react-query";

//We need to create an RPC client which we will use to communicate with the AppType from the route.ts and we are creating a client in the hono.ts file  
import { client
 } from "@/lib/hono"; //here it is transferred 
import { convertAmountFromMiliUnits } from "@/lib/utils";
 

 export const useGetIndividualTransaction = (id?:string)=>{
    const query=useQuery({
        enabled:!!id,//Only fetch the data if the id is present
        queryKey:['transaction',{id}],
        queryFn: async ()=>{ 
        const response = await client.api.transactions[':id'].$get({
            param:{id},
        });
        //here we are calling the get method from the accounts.ts file
        if(!response.ok){
            throw new Error('failed to fetch transaction')
        }
    const  {data}  = await response.json();
        return {
            ...data,
            amount:convertAmountFromMiliUnits(data.amount),
        };
    } 
    })
    return query;
 }