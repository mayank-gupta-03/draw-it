import { JWT_SECRET } from "@repo/common/config";
import jwt, { JwtPayload } from "jsonwebtoken";

const validateToken = (token: string): string | null => {
  if (!JWT_SECRET) return null;
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  if (!decoded || !decoded.userId) return null;
  return decoded.userId;
};

export default validateToken;
