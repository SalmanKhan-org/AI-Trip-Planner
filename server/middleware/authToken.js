const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization header missing or malformed"
      });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Optionally fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        return res.status(403).json({
            success: false,
            message:"Login to  access"
      })
    }
    req.user = user; // Attach user info to request
    next();
  } catch (err) {
      return res.status(401).json({
          success: false,
          message:"Invalid or expired token error"
    })
  }
};
