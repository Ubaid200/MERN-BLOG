import { handlerror, handlsuccess } from '@/utiles/toast';
import React, { useState } from 'react'
import { FaComment } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import CommentList from './CommentList';
function Comment({ blogid }) {
    const [comment, setcomment] = useState('')
    const [refresh, setRefresh] = useState(false);
    const user = JSON.parse(localStorage.getItem("isAuth"))
    const users = JSON.parse(localStorage.getItem("user"))
    const handlesumit = async () => {

        try {
            const payload = {
                comment,
                author:users.id,
                blogid
            }
            const res = await fetch(`http://localhost:3000/api/comment/add`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })
            const rescomment = await res.json()
            if (!res.ok) {
                return handlerror(rescomment.message)
            }
            handlsuccess(rescomment.message)
            setcomment("")
            setRefresh(prev => !prev)

        } catch (error) {
            handlerror(error.message || "Something went wrong")
        }
    }
    return (
        <div>
            
            <h2 className='flex items-center gap-2 text-2xl border-t my-5'><FaComment /> Comment</h2>
           {user? <div className="col-span-full gap-4">
                <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">Name</label>
                <div className="mt-2">
                    <textarea rows="3" id="comment" value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='Write your comment...' className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                </div>

                <button onClick={handlesumit} className='w-18 mt-4 hover:bg-blue-800 bg-blue-700 font-bold text-white rounded-md py-1.5'>Submit</button>
            </div>
            :
             <Link to='/sign-in'>
             <button className='w-18 mt-4 hover:bg-blue-800 bg-blue-700 font-bold text-white rounded-md py-1.5'>Sign in</button>
           
             </Link>
            }
            <div className='mt-5'>
                <CommentList commentid={blogid} refresh={refresh}/>
            </div>
        </div>
    )
}

export default Comment
