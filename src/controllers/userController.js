import User from '../models/userModel.js';


export const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json({ users });
};


export const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
};