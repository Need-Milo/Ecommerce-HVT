import jwt from "jsonwebtoken";
import { usersData } from "../data/user.js";

const JWT_SECRET = "MY_SECRET_KEY";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = usersData.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User không tồn tại" });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};
