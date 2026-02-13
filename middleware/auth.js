const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  const authHeaders = req.headers.authorization;
  console.log(' Acccess token we have ==>   ' , authHeaders);
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key"; // ✅ MATCH
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
