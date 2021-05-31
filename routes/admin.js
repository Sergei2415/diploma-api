
const router = require('express').Router();
const { getproductsall, deleteproduct, postproducts, getusersall } = require('../controllers/product');
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

// Команды от админа 
router.get('/productsall', getproductsall);
router.delete('/products/:id', deleteproduct);
router.post('/products', celebrate({
    body: Joi.object().keys({
      title: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      country: Joi.string().required().min(2),
      category: Joi.string().required().min(2),
      brand: Joi.string().required().min(2),
      deadline: Joi.string().required().min(2),
      storage: Joi.string().required().min(2),
      temperature: Joi.string().required().min(2),
      measurement: Joi.string().required().min(2),
      image: Joi.string().regex(/^(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_/]{1,})?(:\d{1,5})?#?$/i),
      price: Joi.string().required().min(2),
      discount: Joi.string(),
    }),
  }), postproducts); 
// Команды от админа
router.get('/usersall', getusersall);
module.exports = router;
