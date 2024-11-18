import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("Extracted Token:", token); // Debug log to confirm extraction

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log the specific error
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }
      req.user = decoded; // Attach decoded payload to `req.user`
      next(); // Proceed to the next middleware
    });
  } catch (error) {
    console.error("Middleware Error:", error); // Log unexpected middleware errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};
