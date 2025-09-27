"use client"
import Form from 'next/form'
import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl">
      <Form action="/search" className="relative group">
        <input
          type="text"
          placeholder="Search events, artists, venues..."
          name="q"
          className="w-full bg-white/95 backdrop-blur-sm border-2 border-secondary rounded-full py-4 pl-14 pr-32 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-white shadow-lg focus:shadow-xl hover:shadow-xl transition-all duration-300"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary w-5 h-5 group-focus-within:text-primary transition-colors duration-200" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2.5 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          Search
        </button>
      </Form>
    </div>
  )
}

export default SearchBar