const {getUsersController,
    getUserByIdController, 
    createUserController,
    updateUserController,
    loginUserController,
    deleteUserController} = require('../controlllers/userController');

const express = require('express');
const router = express.Router();

//user routes
router.get('/', getUsersController);
router.post('/login', loginUserController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;