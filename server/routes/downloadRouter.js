const Router = require('express');
const router = new Router();

const downloadController = require('../controllers/downloadController');
const checkRole = require('../middleware/CheckRoleMiddleware')


router.get('/', checkRole('ADMIN'), downloadController.download);


module.exports = router;