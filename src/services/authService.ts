import { Request, Response } from "express";
import { userRepository } from "../repository.ts/userRepository";

export const authService = {
    async loginService(req: Request, res: Response) {
        const requestBody = req.body;
        console.log({ requestBody });
        const existingUser = await userRepository.findByUsername(requestBody.username);
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        res.send("Login endpoint");
    }
}