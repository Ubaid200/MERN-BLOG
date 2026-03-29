
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { handlerror, handlsuccess } from "@/utiles/toast"
import { use } from "react"


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, 'password must be 4 chracter')
})

export default function Signin() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const onSubmit = async (value) => {
         try {
              const res = await fetch("http://localhost:3000/auth/signin",{
                method:"POST",
                headers:{
                   "Content-Type": "application/json"
                },
                credentials:'include',
                body:JSON.stringify(value)
              })
              const data = await res.json()
              if(!res.ok){
                handlerror(data.message || "Signup failed");
                return
              }
              handlsuccess('Successfully sign-In')
             localStorage.setItem("isAuth", JSON.stringify(data.isAuth))
             localStorage.setItem("user", JSON.stringify(data.user))

             setTimeout(() => {
              navigate("/");
            }, 3000);
            } catch (error) {
              handlerror(error.message || "Something went wrong");
            }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-100 p-5 rounded-xl shadow-xl">
                <div>
                    <h1 className="text-center font-bold mb-5 text-2xl">Login Into Account</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder="Enter your password" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Submit</Button>
                        <div className="text-center">
                            <p>Don&apos;t have Account?<Link to="/sign-up" className="text-blue-500 hover:font-bold"> Sign up</Link></p>
                        </div>
                    </form>
                </Form>
            </div>

        </div>

    )
}