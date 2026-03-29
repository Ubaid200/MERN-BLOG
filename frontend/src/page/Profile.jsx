import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { handlerror, handlsuccess } from "@/utiles/toast"


const profileSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z
        .string()
        .optional()
        .or(z.literal(""))
        .transform(val => (val === "" ? undefined : val))
        .refine(val => !val || val.length >= 4, {
            message: "Password must be 4 characters",
        }),
    bio: z.string().max(200).optional()
})

function Profile() {

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }

    } = useForm({
        resolver: zodResolver(profileSchema)
    })
    useEffect(() => {
        if (!user?.id) return
        const getUser = async () => {
            const res = await fetch(`http://localhost:3000/api/get-user/${user.id}`, {
                credentials: "include"
            })
            const data = await res.json()

            // form me value bharna
            setValue("name", data.user.name)
            setValue("email", data.user.email)
            setValue("bio", data.user.bio || "")
        }
        getUser()
    }, [setValue, user?.id])

    // 🔹 UPDATE USER
    const onSubmit = async (formData) => {
        try {
            if (!formData.password) {
                delete formData.password
            }
            const res = await fetch(`http://localhost:3000/api/update/${user.id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!res.ok) {
                return handlerror(data.message)
            }
            handlsuccess(data.message)
        } catch (error) {
            handlerror(error.message || "Something went wrong")

        }

    }

    return (

        <div className='flex justify-center items-center  min-h-[calc(100vh-64px)]' >
            <div className="w-full border mt-8 rounded-lg p-6 mx-[10%] flex flex-col items-center gap-6">

                <Avatar className='w-28 h-28'>
                    <AvatarImage src="https://api.dicebear.com/7.x/micah/png?size=460&seed=man" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" type="text"  {...register("name")} autoComplete="name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" {...register("email")} autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" type="password" {...register("password")} autoComplete="new-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="bio" className="block text-sm/6 font-medium text-gray-900">Bio</label>
                        <div className="mt-2">
                            <textarea id="bio" {...register("bio")} rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>
                    <button className='w-full hover:bg-blue-800 bg-blue-700 font-bold text-white rounded-md py-1.5'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Profile
