import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../images/logo.png'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import SearchBar from './SearchBar'
const Header = () => {
  return (
    <header className='border-b bg-white'>
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
                            <button className='text-sm text-foreground border-2 border-primary py-2 px-3 rounded hover:bg-secondary hover:border-accent hover:text-primary cursor-pointer'>Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
            {/* searchBar */}
            <div className='w-full lg:max-w-2xl'>
                <SearchBar/>
            </div>
        </div>
    </header>
  )
}

export default Header