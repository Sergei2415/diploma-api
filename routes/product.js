
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getproducts, findproducts, infproductsId, getusersall } = require('../controllers/product');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/products', getproducts);// здесь не стал реализовывать схему, так как ничего не передаем
router.post('/findproducts', celebrate({
  body: Joi.object().keys({
    findtext: Joi.string(),
  }),
}), findproducts); 

router.get('/products/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), infproductsId);


router.get('/usersall', getusersall);
module.exports = router;
