import { verifyToken } from '../utils/jwt.js';


export const protect = (req, res, next) => {
    try {
        const token = req.cookies?.[process.env.COOKIE_NAME || 'token'] || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });


        const decoded = verifyToken(token);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};