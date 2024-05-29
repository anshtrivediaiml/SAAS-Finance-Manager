import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const HeaderLogo = () => {
  return (
    <Link href='/'>
      <div className='items-center hidden lg:flex'>
        <Image src='/demologo2.svg' width={38} height={38} alt={"Logo"}/>
        <p className='font-semibold text-white text-2xl ml-2.5'>
            Finance Manager
        </p>
      </div>
    </Link>
  )
}

export default HeaderLogo
