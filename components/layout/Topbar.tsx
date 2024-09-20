import { navLinks } from '@/lib/constants'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Menu } from 'lucide-react'

const Topbar = () => {
  return (
    <div className='sticky top-0 z-20 w-full flex justify-between px-8 py-4 b-blue-2 shadow-xl lg:hidden'>
      <Image alt='Logo' src="/logo.png" width={150} height={70}  />
        <div className='flex gap-8 max-md:hidden'>
            {navLinks.map((link) => (
                <Link className='flex gap-4 text-body-medium' key={link.label} href={link.url}>
                  <p>{link.label}</p></Link>
            ) )}
        </div>
        <div className="flex gap-4 text-body-medium items-center">
            <Menu className="cursor-pointer max-md:hidden" />
            <UserButton />
            
        </div>
    </div>
  )
}

export default Topbar