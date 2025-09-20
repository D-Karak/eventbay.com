import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../images/logo.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
const Header = () => {
  return (
    <header className='border-b '>
        <div className='flex flex-col lg:flex-row items-center gap-4 p-4'>
            <div className='flex items-center justify-between w-full lg:w-auto'>
                <Link href='/' className="font-bold shrink-0">
                    <Image
                    src={logo}
                    alt="EventBay Logo"
                    width={100}
                    height={100}    
                    className="w-20 lg:w-18"
                    ></Image>
                </Link>
                <div className='lg:hidden'>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton>
                            <button className='bg-accent text-primary text-sm rounded-lg hover:bg-primary transition-border-gray-300 py-2 px-3'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header