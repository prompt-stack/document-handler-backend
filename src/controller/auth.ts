import { Request, Response, Router } from "express";
import { authService } from "../services/authService";

const BASE_PATH = "/auth"
const authRoutes = Router()

authRoutes.post(`${BASE_PATH}/login`, (req: Request, res: Response) => {
    return authService.loginService(req, res);
});

export default authRoutes;