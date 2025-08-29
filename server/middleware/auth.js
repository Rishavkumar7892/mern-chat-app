import User from "../models/User.js";
import jwt from "jsonwebtoken";


//middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.json({ success: false, messsage: "User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error.messsage);
        res.json({ success: false, messsage: error.messsage});
    }
}