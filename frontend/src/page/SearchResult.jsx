import BlogCard from '@/components/ui/blogCard'
import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'

function SearchResult() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
  
    const params = new URLSearchParams(location.search)
    const query = params.get("q")
    useEffect(() => {
     
    fetchBlogs()
  

   
  }, [query])
   const fetchBlogs = async () => {

    try {

      const res = await fetch(
        `http://localhost:3000/blog/search?q=${query}`
      )

      const data = await res.json()

      setBlogs(data.blogs)
      console.log(data);
      
      setLoading(false)

    } catch (error) {
       console.log(error)
    }

  }
    return (
        <div className='mt-5 ml-5'>
            <h2 className='font-bold'>Search Result: {query}</h2>
             {loading && <p>Loading...</p>}
             {blogs.map((blog) => (
          <BlogCard key={blog._id} props={blog} />
        ))}
        </div>
    )
}

export default SearchResult
