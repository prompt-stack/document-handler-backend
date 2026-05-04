import { Request, Response, Router } from "express";

const BASE_PATH = "/auth"
const authRoutes = Router()

authRoutes.post(`${BASE_PATH}/login`, (req: Request, res: Response) => {
    const requestBody = req.body;
    console.log({ requestBody });
    
    res.send("Login endpoint");
});

export default authRoutes;