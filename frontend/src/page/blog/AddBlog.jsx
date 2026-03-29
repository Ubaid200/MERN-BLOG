import { handlerror, handlsuccess } from '@/utiles/toast'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import slugify from 'slugify'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDropzone } from 'react-dropzone'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Quill } from "react-quill-new";


Quill.register("modules/imageResize", ImageResize);

function AddBlog() {
    const [datas, setData] = useState([])
    const [preview, setPreview] = useState(null);
    const [file, setfile] = useState()
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const onDrop = useCallback((acceptedFiles) => {
        const files = acceptedFiles[0];
        if (files) {
            setfile(files)
            setPreview(URL.createObjectURL(files));
        }
        console.log(file);

    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        },
        multiple: false
    });
    useEffect(() => {
        getCategory()
        setValue("author", user.id)
    }, [])
    const getCategory = async () => {
        try {
            const res = await fetch(`http://localhost:3000/category/all`, {
                credentials: "include"
            })
            const resdata = await res.json()
            setData(resdata.category)




        } catch (error) {
            handlerror(error.message)

        }
    }

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const blogname = watch("title")
    useEffect(() => {

        if (blogname) {
            const slug = slugify(blogname, { lower: true })
            setValue("slug", slug)
        }

    }, [blogname, setValue])
    const onSubmit = async (blogdata) => {
        try {
            const formData = new FormData()

            formData.append("title", blogdata.title)
            formData.append("slug", blogdata.slug)
            formData.append("category", blogdata.category)
            formData.append("author", blogdata.author)
            formData.append("content", blogdata.content)
            formData.append("image", file)
            const res = await fetch(`http://localhost:3000/blog/add`, {
                method: "post",
                credentials: "include",
                body: formData
            })

            const data = await res.json()
            if (!res.ok) {
                return handlerror(data.message)
            }
            handlsuccess(data.message)
            reset()
            setfile(null)
            setPreview(null)
        } catch (error) {
            handlerror(error.message || "Something went wrong")

        }
        console.log(blogdata);

    }
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],   // 👈 image button
            ["clean"]
        ], imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"]
        }
    };


    return (
        <div className='flex justify-center items-center min-h-[calc(100vh-64px)]'>
            <div className="w-full border mt-8 rounded-lg p-6 mx-[10%] flex flex-col items-center gap-6">
                <h1 className='text-center text-2xl'>Add Blog</h1>
                <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>


                    <div>
                        <label className="block text-sm font-medium text-gray-900">Category</label>
                        <Select onValueChange={(val) => setValue("category", val)}>
                            <SelectTrigger className="w-full py-1.5">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {datas && datas.length > 0 && datas.map(item => <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>)}

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Title</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("title", { required: "Title is required" })}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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
                    <div
                        {...getRootProps()}
                        style={{
                            width: "260px",
                            height: "260px",
                            border: "2px dashed #888",
                            borderRadius: "14px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            background: isDragActive ? "#e0f2fe" : "#f9f9f9",
                            transition: "0.2s",
                            position: "relative"
                        }}>
                        <input {...getInputProps()} />
                        {preview ?
                            <img
                                src={preview}
                                alt="preview"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                            :
                            <p style={{ color: "#666", fontSize: "16px", textAlign: "center" }}>
                                Click or Drag image here
                            </p>
                        }
                    </div>
                    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
                        <ReactQuill
                            theme="snow"
                            value={watch("content") || ""}
                            onChange={(val) => setValue("content", val)}
                            modules={modules}
                            placeholder="Write your blog here..."
                        />

                    </div>
                    <button className='w-full hover:bg-blue-800 bg-blue-700 font-bold text-white rounded-md py-1.5'>
                        Save
                    </button>

                </form>
            </div>
        </div>
    )
}

export default AddBlog
