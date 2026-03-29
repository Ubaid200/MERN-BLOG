import Blog from "../models/Blog.js"
import fs from "fs";
import path from "path";
import Category from "../models/Category.model.js"
import { log } from "console";

export const addBlog = async (req, res) => {
    try {
        const { author, category, title, slug, content } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image required" })
        }

        const imagePath = `/uploads/blog/${req.file.filename}`

        const blog = new Blog({
            author,
            category,
            title,
            slug,
            content,
            featureImage: imagePath
        })
        await blog.save()
        res.status(200).json({ message: "Successsfully add Blog" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const showBlog = async (req, res) => {
    try {
        const blog = await Blog.find().populate('author', 'name avatar').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({ blog })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const blogDelete = async (req, res) => {
    try {
        const { delblog } = req.params
        const blog = await Blog.findById(delblog);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.featureImage) {
            const imagePath = path.join(process.cwd(), blog.featureImage);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Blog.findByIdAndDelete(delblog)
        res.status(200).json({ message: "successfully Blog Delete" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const editBlog = async (req, res) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            return res.status(404).json({ message: "Data Not found" })
        }
        res.status(200).json({ blog })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateBlog = async (req, res) => {
    try {
        const { blogid } = req.params
        const updateData = req.body
        console.log(blogid);

        if (req.file) {
            const oldblog = await Blog.findById(blogid)
            if (oldblog?.featureImage) {
                const oldpath = path.join(process.cwd(), oldblog.featureImage)
                if (fs.existsSync(oldpath)) fs.unlinkSync(oldpath);
            }
            updateData.featureImage = `/uploads/blog/${req.file.filename}`;
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogid, updateData, { new: true }).populate("category", "name")
            .populate("author", "name");;
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const blogpage = async (req, res) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug }).populate('author', 'name avatar').populate('category', 'name slug').lean().exec()
        res.status(200).json({ blog })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const blogRelated = async (req, res) => {
    try {
        const { slug ,blog} = req.params
        const categoryData = await Category.findOne({slug}).lean().exec()
        if(!categoryData){
            return res.status(404).json({message:"Cannot data found"})
        }
          
          
        const blogs = await Blog.find({category:categoryData._id ,slug:{$ne:blog}  }).lean().exec()
        res.status(200).json({ blogs })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const bloggetcategory = async (req, res) => {
    try {
        const { categorys} = req.params
        const categoryData = await Category.findOne({slug:categorys}).lean().exec()
        if(!categoryData){
            return res.status(404).json({message:"Cannot data found"})
        }
          
          
        const blogs = await Blog.find({category:categoryData._id }).lean().exec()
        res.status(200).json({ blogs })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const searchBox = async (req, res) => {
    try {
        const { q } = req.query
          if (!q || q.trim() === "") {
    return res.status(400).json({ message: "Search query required" })
}
        const blogs = await Blog.find({   title: { $regex: q, $options: "i" } }).populate('author', 'name avatar').populate('category', 'name slug').lean().exec()
        res.status(200).json({ blogs })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
