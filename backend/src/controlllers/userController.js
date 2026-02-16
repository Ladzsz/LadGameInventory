const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  findUserByEmail,
  updateuserPassword,
} = require("../model/userqueries");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendPasswordResetEmail } = require("../utils/emailService");

//contoller funcctions for user

// const getUsersController = async (req, res) => {
//   try {
//     const users = await getUsers();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("ERROR:", err.message);
//       res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getUserByIdController = async (req, res) => {
//   try {
//     const user = await getUserById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     console.error("ERROR:", err.message);
//       res.status(500).json({ error: "Internal server error" });
//   }
// };

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password, false);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userId = req.user.id; // Use ID from JWT token

    const updatedUser = await updateUser(
      userId,
      username,
      email,
      password,
      undefined, // if admin making other admins logic is wanted later update here and the body as well as incorporating logic
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(401).json({ message: err.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.user.id; // Use ID from JWT token

    await deleteUser(userId);
    res.status(204).send();
  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    // if email doesnt exist return
    if (!user) {
      return res.json({
        message: "If that email exists, a reset link has been sent",
      });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      {
        userId: user.id,
        type: "password-reset",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    // Send email
    await sendPasswordResetEmail(email, resetToken);

    res.json({
      message: "If that email exists, a reset link has been sent",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check token type
    if (decoded.type !== "password-reset") {
      return res.status(400).json({ error: "Invalid token type" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await updateuserPassword(decoded.userId, hashedPassword);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Reset link has expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ error: "Invalid reset link" });
    }

    console.error("Reset password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
  forgotPasswordController,
  resetPasswordController,
};
