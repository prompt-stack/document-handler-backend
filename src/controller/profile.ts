import { Request, Response, Router } from "express";
import { authMiddleware } from "../config/middleware";
import { profileService } from "../services/profileService";

const BASE_PATH = "/me"
const profileRoutes = Router()

profileRoutes.get(BASE_PATH, authMiddleware, (req: Request, res: Response) => {
    return profileService.getMe(req, res);
});

export default profileRoutes;