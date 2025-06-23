import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middleware";
import { createRoom, deleteRoom } from "../controllers/room.controller";

const router: Router = Router();

router.post("/", verifyToken, createRoom);
router.delete("/:roomId", verifyToken, deleteRoom);

export default router;
