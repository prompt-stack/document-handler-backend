import { Request, Response, Router } from "express";
import { authService } from "../services/authService";

const BASE_PATH = "/auth"
const authRoutes = Router()

authRoutes.get(`${BASE_PATH}/login`, (req: Request, res: Response) => {
    return authService.loginService(req, res);
});

authRoutes.post(`${BASE_PATH}/callback`, (req: Request, res: Response) => {
    return authService.callback(req, res);
});

authRoutes.post(`${BASE_PATH}/logout`, (req: Request, res: Response) => {
    return authService.logout(res);
});

export default authRoutes;