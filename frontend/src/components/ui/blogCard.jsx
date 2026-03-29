import { useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import moment from "moment"
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";



export const BlogCard = ({props}) => {
    const [data, setdata] = useState({
        cover:
            'https://plus.unsplash.com/premium_photo-1673984261110-d1d931e062c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
       
    })
     const user = JSON.parse(localStorage.getItem("user") || "{}")
     
      

    return (
        <Link to={`/blog/${props.category.slug}/${props.slug}`}>
        <div className=" my-2 max-w-100 ">
            <div
                key={data.slug}
                className="flex transform flex-col gap-3 rounded-lg border bg-[#F4F4F5] p-3 transition-transform hover:scale-105"
            ><div className="flex gap-2 items-center"> <Avatar>
                    <AvatarImage src={props.author.avatar || "https://github.com/shadcn.png"}/>
                </Avatar>
                <span>{props?.author?.name || "No name"}</span>
                {user && user.role === "admin" && <span className="bg-green-800 text-white rounded-sm w-15 text-center ml-auto px-2">admin</span>
                 }
                 </div>
               
                <figure className="relative h-40 w-full overflow-hidden bg-gray-200">
                    <img
                        className="absolute inset-0 h-full w-full rounded-md object-cover"
                        src={`http://localhost:3000${props?.featureImage}` ||data.cover}
                        alt="demo"
                    />
                </figure>
 <p className="mt-4 text-sm font-semibold text-gray-600 flex-row flex gap-2 items-center">
                     <FaCalendarAlt />   {moment(props.createdAt).format('DD-MM-YYYY')}  </p>
                
                    <h3 className="mb-2 text-xl font-bold text-gray-600 transition-colors duration-200 hover:text-blue-600">
                       {props.title}
                    </h3>
                   
            
            </div>
        </div>
        </Link>
        
    )
}

export default BlogCard