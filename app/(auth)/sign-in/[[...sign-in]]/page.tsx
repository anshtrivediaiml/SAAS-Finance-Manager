import Image from 'next/image'
import {Loader2} from 'lucide-react'
import { SignIn,ClerkLoaded,ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return( 
    // Divide the page into two grids for large screens and one grid for small screens
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      {/* 1st side of grid */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4">

        <div className="text-center space-y-4 pt-16">
       <h1 className="font-bold text-3xl text-[#2e2a47] ">Welcome back</h1>
       <p className="text-base text-[#7e8ca0]">Log in or Create Account to get back to your dashboard</p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
        <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground size-16'/>
          </ClerkLoading>
        </div>
      </div>

      {/* 2nd side of grid */}
      <div className='h-full bg-blue-400 hidden lg:flex items-center justify-center'>
 <Image src='/demologo2.svg' width={100} height={100} alt={"Logo"}/>
      </div>
    </div>
);
}