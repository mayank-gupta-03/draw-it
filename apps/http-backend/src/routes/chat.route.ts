import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import { getChatsByRoomId } from "../controllers/chat.controller";

const router: Router = Router();

router.get("/:roomId", verifyToken, getChatsByRoomId);

export default router;
