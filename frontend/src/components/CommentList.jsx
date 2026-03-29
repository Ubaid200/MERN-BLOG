import { handlerror } from '@/utiles/toast'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import moment from 'moment'


function CommentList({ commentid,refresh }) {
    const [loading, setloading] = useState(true)
    const [commentData, setcommentData] = useState([])

    useEffect(() => {
        getComment()
    }, [commentid,refresh])
    const getComment = async () => {
        try {
            setloading(true)
            const res = await fetch(
                `http://localhost:3000/api/comment/get/${commentid}`,
                { credentials: "include" }
            )

            const resdata = await res.json()
            setcommentData(resdata.comments)
            setloading(false)
           
            


        } catch (error) {
            handlerror(error.message)
            setloading(false)
        }
        if (loading) {return <div>Loading....</div>}

    }
    return (
        <div>
            <hr />
            <h4 className='text-2xl font-bold'>{commentData && commentData.length} Comments</h4>
            <div className='mt-5'>
                {commentData && commentData.length > 0 && commentData.map((item) => {
                    return <div key={item._id} className='flex gap-2 border-b my-5'>

                        <Avatar>
                            <AvatarImage src={item?.author?.avatar || "https://github.com/shadcn.png"} />
                        </Avatar>
                        <div>
                            <p className='font-bold'>{item.author.name}</p>
                            <p>{moment(item.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {item.comment}
                            </div>
                            
                        </div>
                        
                    </div>
                })}

            </div>
        </div>
    )
}

export default CommentList
