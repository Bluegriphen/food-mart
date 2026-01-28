import jwt from "jsonwebtoken";

<<<<<<< HEAD
const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization; 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
=======
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};
>>>>>>> b32db616d3f493326a8a499345dbaaf94957efd1
