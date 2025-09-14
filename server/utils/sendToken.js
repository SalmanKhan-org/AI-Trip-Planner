const jwt = require("jsonwebtoken");
exports.generateToken = (user, res, statusCode, message) => {
  // Create a token with the user's id and expiration date
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
    
    res.status(statusCode).json({
        success: true,
        message,
        token:accessToken
    })
};
