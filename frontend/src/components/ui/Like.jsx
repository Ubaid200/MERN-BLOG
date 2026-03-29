import { handlerror, handlsuccess } from '@/utiles/toast';
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
function Like({ blogid }) {
  const [Likes, setLikes] = useState(0)
  const [haslike,sethaslike] = useState(false)

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    fetch(`http://localhost:3000/api/like/getlike/${blogid}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setLikes(data.likecount);
        sethaslike(data.isLiked)
       
      });
  }, [blogid]);
  const handleLike = async () => {
    try {
      if (!user?.id) {
        return handlerror("please login into your account")
      }
     await fetch(`http://localhost:3000/api/like/addlike`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          userid:user.id,
          blogid
        })
      })
        .then(res => res.json())
        .then(data => {
         handlsuccess(data.message)
         sethaslike(prev => !prev);

    // Like count bhi update kar
        setLikes(prev => haslike ? prev - 1 : prev + 1);

          
        });

    } catch (error) {
      handlerror(error.message)
    }
  }

  return (
    <div onClick={handleLike} className='flex text-2xl items-center gap-2 ml-auto'>
    
      <FaHeart className={haslike? 'text-red-600' : 'text-black'} /><span>{Likes || 0}</span>
    </div>
  )
}

export default Like
