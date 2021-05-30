
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getfavorites, postfavorites, deletefavorites } = require('../controllers/favorites');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/favorites', getfavorites);// здесь не стал реализовывать схему, так как ничего не передаем
router.post('/favorites', celebrate({
  body: Joi.object().keys({
    idproduct: Joi.string().min(24).max(24),
  }),
}), postfavorites);
router.delete('/favorites', celebrate({
    body: Joi.object().keys({
      idproduct: Joi.string().min(24).max(24),
    }),
  }), deletefavorites);

module.exports = router;
