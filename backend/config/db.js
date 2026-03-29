import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("succefull connection");
       
    } catch (error) {
        console.log("connection faild",error);
        
    }
}
export default connectDB;