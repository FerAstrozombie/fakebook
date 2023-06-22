import { User } from "../models/user.js";

export const getProfile = async (req, res) => {
    try {
        const id = req.uid;
        const user = await User.findById(id).lean();
        res.json({email: user.email, uid: user._id});
    } catch (error) {
        
    }
}