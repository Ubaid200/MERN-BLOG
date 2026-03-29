import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { useEffect, useState } from "react";



export function AppSidebar() {
    const [category, setcateogry] = useState([])
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getCategory()
    }, [])
    const getCategory = async () => {
        try {
            const res = await fetch(`http://localhost:3000/category/all`, {
                credentials: "include"
            })
            const resdata = await res.json()
            setcateogry(resdata.category)


        } catch (error) {
            handlerror(error.message)
        }
    }
    return (
        <Sidebar>
            <SidebarHeader>
                <img width={50} src="https://api.dicebear.com/7.x/initials/svg?seed=MB
"/>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <IoHomeOutline />
                                <Link to="">Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {user && user.role === 'admin' ? <>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <GrBlog />
                                    <Link to="/blogdetail">Blogs</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <BiCategory />
                                    <Link to="/categories">Categories</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <FaRegComment />
                                    <Link to="/comments">Comments</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <LuUsers />
                                    <Link to="/users">Users</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </> : <></>}

                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarMenu>
                        {category && category.length > 0 && category.map(item => <SidebarMenuItem key={item._id}>
                            <SidebarMenuButton>
                                <GoDot />
                                <Link to={`/blog-category/${item.slug}`}>{item.name}</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}