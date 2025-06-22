import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";

const router: Router = Router();

router.post("/", verifyToken);

export default router;
