const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../model/userqueries");

//contoller funcctions for user

const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('ERROR:', err.message);
    next(err); 
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('ERROR:', err.message);
    next(err); 
  }
};

const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await createUser(username, email, password, false);

     if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error('ERROR:', err.message);
    next(err); 
  }
};

const updateUserController = async (req, res) => {
  try {
    const { username, email, password, is_admin } = req.body;

      // Only allow admin users to update is_admin
    let adminValue = undefined;
    if (req.user && req.user.is_admin) {
      adminValue = is_admin; // admin can update this
    }

    const updatedUser = await updateUser(
      req.params.id,
      username,
      email,
      password,
      adminValue
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('ERROR:', err.message);
    next(err); 
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

      if (!email || !password) {
  return res.status(400).json({ message: "Email and password are required" });
}
    const result = await loginUser(email, password);
  
    res.status(200).json(result);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(401).json({ message: err.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error('ERROR:', err.message);
    next(err); 
  }
};

module.exports = {
  getUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
};