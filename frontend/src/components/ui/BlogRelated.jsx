import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function BlogRelated() {
    const [related,setrelated] = useState([])
    const {category,blog} = useParams()
   
   
     useEffect(() => {
        fetch(`http://localhost:3000/blog/get-related/${category}/${blog}`, {
          credentials: "include"
        })
          .then(res => res.json())
          .then(data => {
           setrelated(data.blogs)
           
            
          });
      }, [category,blog]);
  return (
    <div>
      <h1 className='text-2xl ml-5 mt-4 font-bold'>Relateds Blog</h1>
       {related && related.length > 0 ? related.map((item) =>(
        <Link key={item._id} to={`/blog/${category}/${item.slug}`}>
         <div  className='flex gap-4 mt-5 ml-3 items-center'>
          <img className='w-17 h-17 object-cover' src={`http://localhost:3000${item.featureImage}`} />
          <h4>{item.title}</h4>
        </div>
        </Link>
       
       )) :<div>Data not found</div>}
    </div>
  )
}

export default BlogRelated
