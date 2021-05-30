
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const favorites = require('../models/favorites');
const baskets = require('../models/baskets');
const orders = require('../models/orders');
const { ConflictingRequest } = require('../errors/ConflictingRequest');

module.exports.getusers = (req, res, next) => {
  users.findById(req.user._id)
    .then((user) => {res.send({ data: { name: user.name, email: user.email } })})
    .catch(next);
};
module.exports.postusers = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => users.create({
      name, email, password: hash,
    }))
    .then((card) => {
      
// Начало создания таблицы избранного для данного пользователя
      users.findUserByCredentials(email, password)
      .then((user) => {
        let userid = user._id
        let array = []
      favorites.create({ userid, array })
        .then((product) => {console.log(product)})
        .catch(next);
      })
      .catch(next);
// Конец создания таблицы избранного для данного пользователя

    // Начало создания таблицы корзины для данного пользователя
    users.findUserByCredentials(email, password)
    .then((user) => {
      let userid = user._id
      let array = []
      baskets.create({ userid, array })
      .then((product) => {console.log(product)})
      .catch(next);
    })
    .catch(next);
    // Конец создания таблицы корзины для данного пользователя

    // Начало создания таблицы заказов для данного пользователя
    users.findUserByCredentials(email, password)
    .then((user) => {
      let userid = user._id
      let array = []
      orders.create({ userid, array, array })
      .then((product) => {console.log(product)})
      .catch(next);
    })
    .catch(next);
    // Конец создания таблицы заказов для данного пользователя




      return res.send({
      data: {
        _id: card._id, name: card.name, email: card.email,
      },
    })})
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictingRequest('Данная учетная запись не была создана, так как введенная почта уже занята другим аккаунтом'));
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;  console.log(req.body)
  return users.findUserByCredentials(email, password)
    .then((user) => {
      let JWT_SECRET;
      if (process.env.NODE_ENV !== 'production') JWT_SECRET = '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
      else JWT_SECRET = process.env.JWT_SECRET || '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
      let token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      token = `Bearer ${token}`;
      res.set('Set-Cookie', 'authorization=' + token);
      res.send({ token });
    })
    .catch(next);
};
