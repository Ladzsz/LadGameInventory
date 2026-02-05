const jwt = require("jsonwebtoken");
const pool = require("../model/pool");

//checking if user logged in
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info in request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

//checking if user is admin
const requireAdmin = async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT is_admin FROM users WHERE id = $1",
      [req.user.id],
    );

    if (!result.rows[0] || !result.rows[0].is_admin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error checking admin status." });
  }
};

module.exports = { authenticateToken, requireAdmin };
