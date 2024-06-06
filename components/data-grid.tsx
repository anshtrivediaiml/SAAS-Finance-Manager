'use client'
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation"
import { FaArrowTrendUp,FaArrowTrendDown } from "react-icons/fa6";
import { FaPiggyBank} from "react-icons/fa";
import { DataCard, DataCardLoading } from "./data-card";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
export const DataGrid=()=>{

    const {data,isLoading}=useGetSummary();
    const params= useSearchParams();
    const to= params.get("to")||undefined;
    const from= params.get("from")||undefined;
    
 if(isLoading){
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
          <DataCardLoading/>
          <DataCardLoading/>
          <DataCardLoading/>
        </div>
    )
 }
    const dateRangeLabel=formatDateRange({to,from});
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
          <DataCard  title="Remaining"
          value={data?.remainingAmount}
          percentageChange={data?.remainingChange}
          icon={FaPiggyBank}
          variant="default"
          dateRange={dateRangeLabel}
          />
           <DataCard  title="Income"
          value={data?.incomeAmount}
          percentageChange={data?.incomeChange}
          icon={FaArrowTrendUp}
          variant="default"
          dateRange={dateRangeLabel}
          />
           <DataCard  title="Expenses"
          value={data?.expensesAmount}
          percentageChange={data?.expenseChange}
          icon={FaArrowTrendDown}
          variant="default"
          dateRange={dateRangeLabel}
          />
        </div>
    );
};