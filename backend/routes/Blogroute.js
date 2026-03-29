import express from "express";
import { upload } from "../helper/upload.js";
import { addBlog, blogDelete, bloggetcategory, blogpage, blogRelated, editBlog, searchBox, showBlog, updateBlog } from "../controller/BlogController.js";
import { authmiddleware } from "../helper/middleware.js";
import { onlyadmin } from "../helper/onlyadmin.js";
const blogroute = express.Router()
blogroute.post("/add",authmiddleware,onlyadmin,upload.single("image"),addBlog)
blogroute.get("/allblog",showBlog)
blogroute.delete("/delete/:delblog",authmiddleware,onlyadmin,blogDelete)
blogroute.get("/edit/:blogid",authmiddleware,onlyadmin,editBlog)
blogroute.put("/update/:blogid",authmiddleware,onlyadmin,upload.single("image"),updateBlog)

blogroute.get("/getpage/:slug",blogpage)
blogroute.get("/get-related/:slug/:blog",blogRelated)
blogroute.get("/get-categoryblog/:categorys",bloggetcategory)
blogroute.get("/search",searchBox)
export default blogroute;