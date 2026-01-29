const {getAllGamesConroller,
    getGameByIdController,
    createGameController,
    updateGameController,
    deleteGameController,
    searchGameController,
} = require('../controlllers/gameController');

const express = require('express');
const router = express.Router();

//game routes
router.get('/', getAllGamesConroller);
router.get('/:id', getGameByIdController);
router.get('/search', searchGameController);
router.post('/', createGameController);
router.put('/:id', updateGameController);
router.delete('/:id', deleteGameController);

module.exports = router;
