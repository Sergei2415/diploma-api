
const router = require('express').Router();
const { Joi } = require('celebrate');
const { getorders } = require('../controllers/orders');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/orders', getorders);// здесь не стал реализовывать схему, так как ничего не передаем


module.exports = router;
