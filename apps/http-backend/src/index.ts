import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import roomRoutes from "./routes/room.route";
import chatRoutes from "./routes/chat.route";
import { API_BASE_URL } from "@repo/common/config";
import { handleError } from "./middleware/error.middleware";
import responseHandler from "./middleware/responseHandler.middleware";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(responseHandler);
app.use(`${API_BASE_URL}/users`, userRoutes);
app.use(`${API_BASE_URL}/rooms`, roomRoutes);
app.use(`${API_BASE_URL}/chats`, chatRoutes);
app.use(handleError);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("App is listening on PORT: ", PORT));
