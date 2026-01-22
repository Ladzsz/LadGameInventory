const {getUsersController,
    getUserByIdController, 
    createUserController,
    updateUserController,
    deleteUserController} = require('../controlllers/userController');

const express = require('express');
const router = express.Router();

//user routes
router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

module.exports = router;