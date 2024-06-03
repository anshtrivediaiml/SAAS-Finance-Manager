//In this file we will be going to create categories hook 
//The file will directly communicate with the categories.ts get endpoint  
import { useQuery } from "@tanstack/react-query";

//We need to create an RPC client which we will use to communicate with the AppType from the route.ts and we are creating a client in the hono.ts file  
import { client
 } from "@/lib/hono"; //here it is transferred 
 

 export const useGetCategories= ()=>{
    const query=useQuery({
        queryKey:['categories'],
        queryFn: async ()=>{ 
        const response = await client.api.categories.$get();
        //here we are calling the get method from the categories.ts file
        if(!response.ok){
            throw new Error('failed to fetch categories')
        }
    const  {data} = await response.json();
        return data;
    } 
    })
    return query;
 }