import { handlerror, handlsuccess } from '@/utiles/toast'
import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import slugify from 'slugify'

function AddCategory() {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const categoryName = watch("name")
    useEffect(() => {

        if (categoryName) {
            const slug = slugify(categoryName, { lower: true })
            setValue("slug", slug)
        }

    }, [categoryName, setValue])
    const onSubmit = async (categorydata) => {
        try {
            const res = await fetch(`http://localhost:3000/category/add`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(categorydata)
            })

            const data = await res.json()
            if (!res.ok) {
                return handlerror(data.message)
            }
            handlsuccess(data.message)
            reset()
        } catch (error) {
            handlerror(error.message || "Something went wrong")

        }
    }

    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-64px)]'>
            <div className="w-full border mt-8 rounded-lg p-6 mx-[10%] flex flex-col items-center gap-6">
                <h1 className='text-center text-2xl'>Add Now</h1>
                <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Slug</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("slug", { required: "Slug is required" })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                        </div>
                    </div>

                    <button className='w-full hover:bg-blue-800 bg-blue-700 font-bold text-white rounded-md py-1.5'>
                        Save
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory
