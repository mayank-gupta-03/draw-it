import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import { API_BASE_URL } from "@repo/common/config";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(`${API_BASE_URL}/users`, userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("App is listening on PORT: ", PORT));
