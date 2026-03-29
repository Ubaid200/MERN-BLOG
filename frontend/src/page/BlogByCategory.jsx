import React, { useEffect, useState } from 'react'
import BlogCard from '@/components/ui/blogCard'
import { handlerror } from '@/utiles/toast'
import { useParams } from 'react-router-dom'
function BlogByCategory() {
  const [loading, setloading] = useState(true)
      const [datas, setData] = useState([])
      const {category} = useParams()
      useEffect(() => {
          if(category){
    blogsall()
  }
      }, [category])
      const blogsall = async () => {
        try {
          const res = await fetch(`http://localhost:3000/blog/get-categoryblog/${category}`, {
            credentials: "include"
          })
          const resdata = await res.json()
          setData(resdata.blogs)
     
           
           
          
    
          setloading(false)
        } catch (error) {
          handlerror(error.message)
          setloading(true)
        }
      }
  return (
    <div>
       {loading && <p className="mt-5">Loading...</p>}

      {!loading && datas.length === 0 && (
        <div className="mt-5">
          <h1>Cannot found Data</h1>
        </div>
      )}
      <div className='flex gap-5'>
      {!loading && datas.length > 0 &&   datas.map((item) => (
      <BlogCard key={item._id} props={item} />
    ))} 
    </div>
    </div>
  )
}

export default BlogByCategory
