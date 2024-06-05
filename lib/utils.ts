import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function convertAmountFromMiliUnits(amount:number){
  return amount/1000;
};

export function convertAmountToMiliUnits(amount:number){
return Math.round(amount*1000);
};

export function formatCurrency(amount:number){
  return(
 new  Intl.NumberFormat('en-IN',{
  style:'currency',
  currency:'INR',
minimumFractionDigits:2,
}).format(amount)
  ) 
 
}