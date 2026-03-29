import { handlerror } from '@/utiles/toast'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Comment from '@/components/Comment'
import moment from 'moment'
import Like from '@/components/ui/Like'
import BlogRelated from '@/components/ui/BlogRelated'

function Blogpage() {
    const [loading, setloading] = useState(true)
    const [datas, setData] = useState(null)

    const { blog } = useParams()

    useEffect(() => {
        blogpage()
    }, [blog])

    const blogpage = async () => {
        try {
            setloading(true)

            const res = await fetch(
                `http://localhost:3000/blog/getpage/${blog}`,
                { credentials: "include" }
            )

            const resdata = await res.json()

            setData(resdata.blog || null)
            
            
            

            setloading(false)

        } catch (error) {
            handlerror(error.message)
            setloading(false)
        }
    }

    return (
        <div className='flex flex-col min-[400px]:flex-row  gap-15 mt-17'>

            {loading && <p className="mt-5">Loading...</p>}

            {!loading && !datas && (
                <div className="mt-5">
                    <h1>Cannot find data</h1>
                </div>
            )}

            {!loading && datas && (
                <div className="border rounded w-full min-[400px]:w-[50%] p-5">
                    <h1 className="text-2xl font-bold">{datas.title}</h1>
                    <div className='flex items-center gap-4 mt-5'>
                        <Avatar>
                            <AvatarImage src={datas.author.avatar || "https://github.com/shadcn.png"} />
                        </Avatar>
                        <div>
                            <span className='font-bold'>{datas.author.name || "No name"}</span><br />
                            <span>Date: {moment(datas.createdAt).format('DD-MM-YYYY')}</span>

                        </div>
                           <Like blogid={datas._id}/>
                    </div>
                   
                       
                    
                    <img
                        className="sm:w-[40%] lg:w-[80%] sm:h-[20%] lg:h-[40%] mx-auto my-5 rounded-md object-cover"
                        src={`http://localhost:3000${datas.featureImage}`}
                        alt="demo"
                    />
                    <div className='wrap-break-word text-justify' dangerouslySetInnerHTML={{ __html: datas.content }}>

                    </div>
                    <Comment  blogid={datas._id} />

                </div>

            )}
            {/* blogrelative */}
            <div className='border rounded w-full min-[400px]:w-[25%]'>
                <BlogRelated />
            </div>

        </div>
    )
}

export default Blogpage