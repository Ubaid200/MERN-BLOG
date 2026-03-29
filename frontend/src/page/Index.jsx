import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/ui/blogCard'
import { handlerror } from '@/utiles/toast'
function Index() {
  const [loading, setloading] = useState(true)
      const [datas, setData] = useState([])
      useEffect(() => {
        blogsall()
      }, [])
      const blogsall = async () => {
        try {
          const res = await fetch(`http://localhost:3000/blog/allblog`, {
            credentials: "include"
          })
          const resdata = await res.json()
          setData(resdata.blog)
           
           
          
    
          setloading(false)
        } catch (error) {
          handlerror(error.message)
          setloading(true)
        }
      }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
       {loading && <p className="mt-5">Loading...</p>}

      {!loading && datas.length === 0 && (
        <div className="mt-5">
          <h1>Cannot found Data</h1>
        </div>
      )}
      <div className='flex gap-5'>
      {!loading && datas.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {datas.map((item) => (
            <BlogCard key={item._id} props={item} />
          ))}
        </div>
      )} 
    </div>
    </div>
  )
}

export default Index
