'use client'
import { Button } from '@/components/ui/button';
import {Card,CardContent,CardTitle,CardHeader} from '@/components/ui/card';
import { useNewAccount } from '@/features/accounts/hooks/use-new-accounts';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';




const AccountsPage =()=>{

    const newAccount =useNewAccount();
    const deleteAccount= useBulkDeleteAccounts();
    const accountsQuery = useGetAccounts();
    const all_accounts= accountsQuery.data || []; 
    const isDisabled= accountsQuery.isLoading || deleteAccount.isPending;

   if(accountsQuery.isLoading){
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

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Accounts Page
                    </CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className='size-4 mr-2'/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} 
                    filterKey='name' 
                    data={all_accounts}
                    onDelete={(row)=>{
                        const ids = row.map((r)=>(r.original.id));
                        deleteAccount.mutate({ids});
                    }}
                    disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
export default AccountsPage;