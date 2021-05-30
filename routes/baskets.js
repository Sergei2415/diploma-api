
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getbaskets, postbaskets, deletebaskets, postbuybaskets } = require('../controllers/baskets');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/baskets', getbaskets);// здесь не стал реализовывать схему, так как ничего не передаем
router.post('/baskets', celebrate({
  body: Joi.object().keys({
    idproduct: Joi.string().min(24).max(24),
  }),
}), postbaskets);
router.delete('/baskets', celebrate({
    body: Joi.object().keys({
      idproduct: Joi.string().min(24).max(24),
    }),
  }), deletebaskets);
router.post('/baskets/buy', celebrate({
    body: Joi.object().keys({
      basketsdates: Joi.array(),
    }),
  }), postbuybaskets);

module.exports = router;
