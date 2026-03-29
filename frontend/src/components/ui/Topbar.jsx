import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { Link, useNavigate } from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import { Input } from './input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CgProfile } from "react-icons/cg";
import { RiBloggerLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { handlerror, handlsuccess } from "@/utiles/toast"
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useSidebar } from './sidebar';


function Topbar() {
  const [login, setlogin] = useState(false)
  const [search,setsearch] = useState("")
  const [toggle,settoggle] = useState(false)
  const {toggleSidebar} = useSidebar()
  const navigate = useNavigate()
useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("isAuth"));
    setlogin(auth === true);
  }, []);
  const handlelogout = async ()=>{
  try {
                const res = await fetch("http://localhost:3000/auth/logout",{
                  method:"POST",
                  credentials:'include'
                })
                const data = await res.json()
                if(!res.ok){
                  handlerror(data.message || "logout failed");
                  return
                }
                localStorage.removeItem("isAuth")
                localStorage.removeItem("user")
                setlogin(false)
                handlsuccess(data.message)
                // window.location.reload()
                navigate("/sign-in")
              
              } catch (error) {
                handlerror(error.message || "Something went wrong");
              }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if(!search.trim()){
    navigate("/")   // ya /blogs
    return
  }

    navigate(`/search?q=${search}`)
  }
  const togglefun = () =>{
     settoggle(!toggle)
  }
  return (
    <div className='flex border-b justify-between px-5 items-center h-16 fixed w-full z-20 bg-white'>
    
        <FiMenu onClick={toggleSidebar} className='text-black size-25  md:hidden block' />

      <div >
        <Link to="/">
         <img  className='md:w-25 w-100 '  src="https://raw.githubusercontent.com/Goswami2021Vaibhav/YT-MERN-BLOG/main/client/src/assets/images/logo-white.png
"/> 
        </Link>
       </div>
      <div className=' md:w-125 w-full'>
       <div className={`flex md:justify-between md:relative md:block absolute md:top-0 top-16 md:p-0 p-1   ${toggle?'block':'hidden'}`}>   <form onSubmit={handleSubmit}>
          <Input placeholder="Search here...." value={search}  onChange={(e)=>setsearch(e.target.value)} className="h-9 rounded-full bg-gray-50" />
        </form>
        </div>
        
      </div>
      <Button onClick={togglefun} className="bg-white border-none ml-auto md:hidden block">
<FaSearch className='text-black size-5 mr-3'/>
      </Button>
      
      <div>
        {login ?
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <CgProfile />
                  <Link to="/profile">
                  Profile
                  </Link>
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <RiBloggerLine />
                  <Link to="">
                  Create Blog
                  </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handlelogout}  className="hover:font-bold">
                 <IoIosLogOut color='red' />
                  Logout
                  </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>:
           <Button asChild>

            <Link to="/sign-in"><CiLogin />Sign in</Link>
          </Button>
          }
      </div>
    </div>
  )
}

export default Topbar
