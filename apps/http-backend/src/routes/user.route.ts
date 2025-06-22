import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const router: Router = Router();

router.post("/login", loginUser);
router.post("/register", createUser);

export default router;
