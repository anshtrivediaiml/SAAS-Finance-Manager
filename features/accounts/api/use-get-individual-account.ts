//In this file we will be going to create accounts hook 
//The file will directly communicate with the accounts.ts get endpoint  
import { useQuery } from "@tanstack/react-query";

//We need to create an RPC client which we will use to communicate with the AppType from the route.ts and we are creating a client in the hono.ts file  
import { client
 } from "@/lib/hono"; //here it is transferred 
 

 export const useGetIndividualAccount= (id?:string)=>{
    const query=useQuery({
        enabled:!!id,//Only fetch the data if the id is present
        queryKey:['account',{id}],
        queryFn: async ()=>{ 
        const response = await client.api.accounts[':id'].$get({
            param:{id},
        });
        //here we are calling the get method from the accounts.ts file
        if(!response.ok){
            throw new Error('failed to fetch account')
        }
    const  {data}  = await response.json();
        return data;
    } 
    })
    return query;
 }