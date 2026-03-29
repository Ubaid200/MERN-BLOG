import express from "express";
import { addCategory, allCategory, deteleCategory, editCategory, showCategory } from "../controller/Category.controller.js";
import { authmiddleware } from "../helper/middleware.js";
import { onlyadmin } from "../helper/onlyadmin.js";
const CategoryRoute = express.Router();
CategoryRoute.post("/add",authmiddleware,onlyadmin,addCategory)
CategoryRoute.put("/update/:categoryid",authmiddleware,onlyadmin,editCategory)
CategoryRoute.get("/show/:categoryid",authmiddleware,onlyadmin,showCategory)
CategoryRoute.delete("/delete/:categoryid",authmiddleware,onlyadmin,deteleCategory)
CategoryRoute.get("/all",allCategory)
export default CategoryRoute;