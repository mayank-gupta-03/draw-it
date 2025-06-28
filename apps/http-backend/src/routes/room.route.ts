import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import {
  createRoom,
  deleteRoom,
  getRoomBySlug,
} from "../controllers/room.controller";

const router: Router = Router();

router.post("/create", verifyToken, createRoom);
router.post("/get", verifyToken, getRoomBySlug);
router.delete("/:roomId", verifyToken, deleteRoom);

export default router;
