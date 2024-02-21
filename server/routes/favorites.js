const Router = require('express');
const router = new Router();


const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware')
router.post('/:bookId',authMiddleware, favoritesController.AddOne);
router.get('/', authMiddleware, favoritesController.getAll);
router.delete('/:bookId', authMiddleware, favoritesController.delete);

module.exports = router;