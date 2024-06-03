'use client'

import { useMountedState } from "react-use"
import { useEffect, useState } from "react"

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"

import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet"

export const SheetProvider=()=>{
    const isMounted = useMountedState(); //This is equivalent to the below usestate and useeffect lines of code
    // const [isMounted,setIsMounted]=useState(false);
    // useEffect(()=>setIsMounted(true),[]);

    if(!isMounted) return null;
    return (
        <>
       <NewAccountSheet/>
       <EditAccountSheet/>

       <NewCategorySheet/>
       <EditCategorySheet/>
        </>
    )
}