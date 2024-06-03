'use client'

import { useMountedState } from "react-use"
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet"
import { useEffect, useState } from "react"
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet"
export const SheetProvider=()=>{
    const isMounted = useMountedState(); //This is equivalent to the below usestate and useeffect lines of code
    // const [isMounted,setIsMounted]=useState(false);
    // useEffect(()=>setIsMounted(true),[]);

    if(!isMounted) return null;
    return (
        <>
       <NewAccountSheet/>
       <EditAccountSheet/>
        </>
    )
}