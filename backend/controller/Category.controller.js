import Category from "../models/Category.model.js"
export const addCategory = async (req,res)=>{
    try {
        const {name,slug} = req.body;
        const category = new Category({
            name,slug
        })
        await category.save()
        res.status(200).json({message: "Successsfully add Category"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
export const showCategory = async (req,res)=>{
    try {
        const {categoryid} = req.params
        const getcategory = await Category.findById(categoryid)
        if(!getcategory){
            return res.status(404).json({
                message: "Data Not found"
            })
        }
        res.status(200).json({getcategory})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const editCategory = async (req,res)=>{
try {
    const {name,slug} = req.body;
    const {categoryid} = req.params
    const category = await Category.findByIdAndUpdate(categoryid,{name,slug},{new:true})
    res.status(200).json({message: "Successfully Category Update"})

} catch (error) {
    res.status(200).json({message:error.message})
}

}
export const deteleCategory = async (req,res)=>{
    try {
       const {categoryid} = req.params
    const categorydelete = await Category.findByIdAndDelete(categoryid)
    res.status(200).json({message: "successfully Category Delete"})
     
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const allCategory = async (req,res)=>{
    try { 
        const category = await Category.find()
        res.status(200).json({
            category
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}