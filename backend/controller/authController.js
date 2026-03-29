import jwt from "jsonwebtoken";
import { handleError } from "../helper/handleError.js";
import User from "../models/User.js"
import bcrypt from "bcrypt"
export const Registor = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const check = await User.findOne({ email })
        if (check) {
            return next(handleError(402, "User already register"))
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, password: hashpassword,rile: "user",avatar: "https://api.dicebear.com/7.x/micah/png?size=460&seed=man"
        })
        await user.save();
        res.status(200).json({
            success: true,
            message: "Registration successfull"
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const Login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const check = await User.findOne({ email })
        if (!check) {
            next(handleError(404, "Invalid User please Sign-up"))
            return
        }
        const comparepassword = await bcrypt.compare(password, check.password)
        if (!comparepassword) {
            return next(handleError(404, "Invalid User please Enter right password"))
        }
        const token = jwt.sign({
            id: check._id,
            role:check.role
        }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // production me true
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({
            success: true,
            isAuth: true,
            user: {
                id: check._id,
                name: check.name,
                email: check.email,
                role: check.role
            },
            message: "Login succefully.."
        })
    } catch (error) {
        next(handleError(500, error.message))
    }


}

export const Logout = (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // production me true
            sameSite: "strict",
        });
        res.status(200).json({
            success: true,
            isAuth: false,
            message: "Logout succefully.."
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}