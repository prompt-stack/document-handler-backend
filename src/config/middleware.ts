import { Request, Response, NextFunction } from 'express';
import { initializeClient } from '../config/cognitoConfig';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const client = await initializeClient();
        if (!client) {
            return res.status(500).json({ message: "Failed to initialize client" });
        }

        await client.userinfo(token);
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};