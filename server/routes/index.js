const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const favorites = require('./favorites');   
const BookRouter = require('./BookRouter');
const downloadRouter = require('./downloadRouter');

router.use('/user', userRouter);
router.use('/book', BookRouter);
router.use('/favorites', favorites);
router.use('/download', downloadRouter)

module.exports = router;