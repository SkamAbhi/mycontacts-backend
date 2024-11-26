const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.createdUser;
      console.log("Decoded user:", req.user);
      next();
    } catch (err) {
      console.log("Token verification failed:", err);
      res.status(401).json({ message: "User is not authorized" });
    }
  } else {
    res.status(401).json({ message: "Token is missing or invalid" });
  }
});

module.exports = validateToken;
