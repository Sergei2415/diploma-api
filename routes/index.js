const router = require('express').Router();
const productrouter = require('./product');
const userrouter = require('./users');
const authorizationrouter = require('./authorization');
const favoritesrouter = require('./favorites');
const admin = require('./admin');
const basketsrouter = require('./baskets');
const ordersrouter = require('./orders');
const resourcenotfound = require('./resourcenotfound');
const auth = require('../middlewares/auth');

router.use(authorizationrouter);
router.use(productrouter);

router.use(auth);
router.use(admin);
router.use(userrouter);
router.use(favoritesrouter);
router.use(basketsrouter);
router.use(ordersrouter);

router.use(resourcenotfound);


module.exports = router;
