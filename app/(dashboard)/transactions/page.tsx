'use client'
import { Button } from '@/components/ui/button';
import {Card,CardContent,CardTitle,CardHeader} from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useState } from 'react';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';
import { transactions as transactionSchema } from '@/db/schema';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';

enum VARIANTS{
    LIST="LIST",
    IMPORT="IMPORT"
}
const Initial_Import_Results={
    data:[],
    errors:[],
    meta:{},
}


const TransactionsPage =()=>{

   const [AccountDialog,confirm]=useSelectAccount();
     
    const [variant,setVariant]=useState<VARIANTS>(VARIANTS.LIST);
    const [importResults,setImportResults]=useState(Initial_Import_Results);

    const onUpload =(results:typeof Initial_Import_Results)=>{
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport=()=>{
        setImportResults(Initial_Import_Results);
        setVariant(VARIANTS.LIST);
    }

    const newTransaction =useNewTransaction();
    const CreateTransactions=useBulkCreateTransactions();
    const deleteTransaction= useBulkDeleteTransactions();
    const TransactionsQuery = useGetTransactions();
    const all_transactions = TransactionsQuery.data || []; 

    const isDisabled= TransactionsQuery.isLoading || deleteTransaction.isPending;

  const onSubmitImport =async(values:typeof transactionSchema.$inferInsert[],)=>{
   
    //We will pass the values to the database using the /bulk-create api route but for that which transaction will go for which account we are defining a new hook  use-select-account.tsx
    const accountId=await confirm();
    if(!accountId){
        return toast.error('Please select an account to continue.');
    }
    const data=values.map((value)=>({
        ...value,
        accountId:accountId as string,
    }));

    CreateTransactions.mutate(data,{
        onSuccess:()=>{
            onCancelImport();
        },
    });
  }

   if(TransactionsQuery.isLoading){
 return(
    <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
       <Card className='border-none drop-shadow-sm'>
          <CardHeader> 
            <Skeleton className='h-8 w-48' />
          </CardHeader>
         <CardContent>
             <div className='h-[500px] w-full flex items-center justify-center'>
                <Loader2 className='size-6 text-slate-300 animate-spin'/>
             </div>
           </CardContent>
       </Card> 
    </div>
 )   
}

if(variant===VARIANTS.IMPORT){

    return (
       <>
       <AccountDialog/>
       <ImportCard 
       data={importResults.data} 
       onCancel={onCancelImport} 
       onSubmit={onSubmitImport}/>
       </> 
    )
}

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Transaction History
                    </CardTitle>
                    <div className='flex  flex-col lg:flex-row items-center gap-x-2 gap-y-2'>
                    <Button onClick={newTransaction.onOpen} size="sm" className='w-full lg:w-auto'>
                        <Plus className='size-4 mr-2'/>
                        Add new
                    </Button>
                    <UploadButton 
                     onUpload={onUpload}
                    />
                    </div>

                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} 
                    filterKey='payee' 
                    data={all_transactions}
                    onDelete={(row)=>{
                        const ids = row.map((r)=>(r.original.id));
                        deleteTransaction.mutate({ids});
                    }}
                    disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
export default TransactionsPage;