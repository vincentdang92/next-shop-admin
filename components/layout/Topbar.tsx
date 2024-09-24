"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'

const Topbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  return (
    <div className='sticky top-0 z-20 w-full flex justify-between px-8 py-4 b-blue-2 shadow-xl lg:hidden'>
      <Image alt='Logo' src="/logo.png" width={150} height={70}  />
        <div className='flex gap-8 max-md:hidden'>
            {navLinks.map((link) => (
                <Link className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1": "text-grey-1"}`} 
                key={link.label} 
                href={link.url}
                >
                  <p>{link.label}</p></Link>
            ) )}
        </div>
        <div className="flex gap-4 text-body-medium items-center">
            <Menu className="cursor-pointer max-md:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />
             { dropdownMenu && (
              <div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl'>
                {navLinks.map((link) => (
                    <Link className='flex gap-4 text-body-medium' key={link.label} href={link.url}>{link.icon} <p>{link.label}</p></Link>
                ) )}
            </div>

             )} 
            <UserButton />
            
        </div>
    </div>
  )
}

export default Topbar