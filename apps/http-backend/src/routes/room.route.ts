import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import {
  createRoom,
  deleteRoom,
  getRoomBySlug,
} from "../controllers/room.controller";

const router: Router = Router();

router.post("/", verifyToken, createRoom);
router.get("/", verifyToken, getRoomBySlug);
router.delete("/:roomId", verifyToken, deleteRoom);

export default router;
