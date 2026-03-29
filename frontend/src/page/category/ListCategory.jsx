import { Button } from '@/components/ui/button'
import { handlerror, handlsuccess } from '@/utiles/toast'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";


function ListCategory() {
  const [loading, setloading] = useState(true)
  const [datas, setData] = useState([])
  useEffect(() => {
    getCategory()
  }, [])
  const getCategory = async () => {
    try {
      const res = await fetch(`http://localhost:3000/category/all`, {
        credentials: "include"
      })
      const resdata = await res.json()
      setData(resdata.category)
      

      setloading(false)
    } catch (error) {
      handlerror(error.message)
      setloading(true)
    }
  }

   const handledelete = async (value) =>{
    const c = confirm('Are you sure delete category?')
    if(c){
      try {
        const res = await fetch(`http://localhost:3000/category/delete/${value}`, {
          method:"delete",
        credentials: "include"
      })
      const data = await res.json();
      if(!res.ok){
        return handlerror("Does Not Delete")
      }
      handlsuccess(data.message)
      getCategory()
      } catch (error) {
        handlerror(error.message)
      }

    }else{
      return false
    }
  }

  return (
    <div className='mt-10 ml-10 border rounded-md pt-10 pb-10 pl-5 pr-5'>
      <Button className='bg-[rgb(148,40,255)] hover:bg-[rgb(75,3,148)]'><Link to='/category/add'>Add Category</Link></Button>
      {loading && <p className="mt-5">Loading...</p>}

      {!loading && datas.length === 0 && (
        <div className="mt-5">
          <h1>Cannot found Data</h1>
        </div>
      )}
      {!loading && datas.length > 0 && (<div className="overflow-x-auto"><table className="min-w-175 table-auto w-full mt-6 rounded-md overflow-hidden">
        <thead className='bg-gray-100 border-b'>
          <tr>
            <th className='py-3 text-left'>Name</th>
            <th className='py-3 text-left'>Slug</th>
            <th className='py-3 text-left'>Acton</th>
          </tr>
        </thead>
        <tbody>

          {Array.isArray(datas) && datas.map((item, index) => {
            return (<tr className='bg-gray-50' key={index}>
              <td className='py-2'>{item.name}</td>
              <td>{item.slug}</td>
              <td className='flex gap-4 text-xl mt-2'>
                <Link to={`/category/edit/${item._id}`}>
                  <FaRegEdit className='hover:text-green-600' />
                </Link>
               
                  <FaRegTrashAlt onClick={()=>handledelete(item._id)} className='hover:text-red-600' />
              </td>
            </tr>)
          })}
        </tbody>
      </table></div>)}


    </div>
  )
}

export default ListCategory
