"use client"
import Form from 'next/form'
import { Search } from 'lucide-react'
const SearchBar = () => {
  return (
    <div>
        <Form action="/search" className='relative '>
        <input type="text"
        placeholder='Search your favourite events, artists, venues. . .'
        name='q'
        className='w-full border-2 border-gray-300 rounded-lg py-2 pl-12 pr-4 focus:outline-none shadow-sm focus:ring-2 focus:ring-accent transition-all duration-200'
        />
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 y-5'/>
        <button type='submit'
         className='absolute top-1/2 right-0 -translate-y-1/2 h-full cursor-pointer bg-primary text-white rounded-r-lg text-sm font-medium hover:bg-accent transition-colors duration-200 px-4 py-1.5'>Search</button>
        </Form>
    </div>
  )
}

export default SearchBar