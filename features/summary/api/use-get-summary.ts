//In this file we will be going to create accounts hook 
//The file will directly communicate with the accounts.ts get endpoint  
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

//We need to create an RPC client which we will use to communicate with the AppType from the route.ts and we are creating a client in the hono.ts file  
import { client
 } from "@/lib/hono"; //here it is transferred 
import { convertAmountFromMiliUnits } from "@/lib/utils";
 

 export const useGetSummary= ()=>{

    const params= useSearchParams();
    const from= params.get("from")||"";
    const to= params.get("to")||"";
    const accountId =params.get("accountId")|| "";
    const query=useQuery({
        //Check if params are needed in the key
        queryKey:['summary',{from,to,accountId}],
        queryFn: async ()=>{ 
        const response = await client.api.summary.$get({
            query:{
                from,
                to,
                accountId,
            },
        });
        //here we are calling the get method from the accounts.ts file
        if(!response.ok){
            throw new Error('failed to fetch summary')
        }
    const  {data} = await response.json();
        return {
            ...data,
            incomeAmount: convertAmountFromMiliUnits(data.incomeAmount),
            expenseAmount: convertAmountFromMiliUnits(data.expensesAmount),
            remainingAmount: convertAmountFromMiliUnits(data.remainingAmount),
            categories:data.categories.map((category)=>({
                ...category,
                value:convertAmountFromMiliUnits(category.value),
            })),
            days:data.days.map((day)=>({
                ...day,
                incomeAmount:convertAmountFromMiliUnits(day.income),
                expenseAmount:convertAmountFromMiliUnits(day.expenses),
            }))
        }
    } ,
    });
    return query;
 };