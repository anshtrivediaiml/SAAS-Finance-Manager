//In this file we will be going to create accounts hook 
//The file will directly communicate with the accounts.ts get endpoint  
import { useQuery } from "@tanstack/react-query";

//We need to create an RPC client which we will use to communicate with the AppType from the route.ts and we are creating a client in the hono.ts file  
import { client
 } from "@/lib/hono"; //here it is transferred 
 

 export const useGetAccounts= ()=>{
    const query=useQuery({
        queryKey:['accounts'],
        queryFn: async ()=>{ 
        const response = await client.api.accounts.$get();
        //here we are calling the get method from the accounts.ts file
        if(!response.ok){
            throw new Error('failed to fetch accounts')
        }
    const  {data} = await response.json();
        return data;
    } 
    })
    return query;
 }