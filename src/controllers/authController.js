import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { signToken } from '../utils/jwt.js';


export const register = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;


    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });


    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    const hashed = await bcrypt.hash(password, saltRounds);


    const user = await User.create({ firstname, lastname, username, email, password: hashed });


    const token = signToken({ id: user._id, email: user.email });


    // set secure cookie
    res.cookie(process.env.COOKIE_NAME || 'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });


    res.status(201).json({ message: 'Registered', user: { id: user._id, email: user.email, username: user.username } });
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });


    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });


    const token = signToken({ id: user._id, email: user.email });


    res.cookie(process.env.COOKIE_NAME || 'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
    });


    res.json({ message: 'Logged in', user: { id: user._id, email: user.email, username: user.username } });
};


export const logout = async (req, res) => {
    res.cookie(process.env.COOKIE_NAME || 'token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.json({ message: 'Logged out' });
};