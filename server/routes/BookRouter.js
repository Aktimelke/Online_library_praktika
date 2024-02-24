const Router = require('express');
const router = new Router();

const bookController = require('../controllers/bookController');
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/create',checkRole('ADMIN'), bookController.create);
router.post('/genre',checkRole('ADMIN'), bookController.createGenre);
router.post('/author',checkRole('ADMIN'), bookController.createAuthor);
router.get('/', bookController.getAll);
router.get('/:id',bookController.getByID);
router.delete('/:id',checkRole('ADMIN'), bookController.delete);


module.exports = router;