import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import {
  joinRoom,
  deleteRoom,
  getRoomBySlug,
} from "../controllers/room.controller";

const router: Router = Router();

router.post("/create", verifyToken, joinRoom);
router.get("/:slug", verifyToken, getRoomBySlug);
router.delete("/:roomId", verifyToken, deleteRoom);

export default router;
