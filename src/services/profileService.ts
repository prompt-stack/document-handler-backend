import { Request, Response } from "express";
import { initializeClient } from "../config/cognitoConfig";

export const profileService = {
    async getMe(req: Request, res: Response) {
        const client = await initializeClient();
        if (!client) {
            return res.status(500).json({ message: "Failed to initialize client" });
        }
        
        const token = req.cookies.access_token;
        const userInfo = await client.userinfo(token);
        return res.json({ user: userInfo });
    }
}