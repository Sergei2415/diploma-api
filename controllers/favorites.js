
const favorites = require('../models/favorites');
const products = require('../models/products');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getfavorites = (req, res, next) => {
  console.log("Начало метода1")
        let array = []
  favorites.findOne({ userid: req.user._id })
    .then((product) => {
      if (product == null) return next(new EntryNotFound('Данная запись не найдена'));
            products.find({})
            .then((elem) => {
                for(let j = 0;j<product.products.length;j++){
                    let elem2 = product.products[j]
                   for(let i = 0;i<elem.length;i++){
                    let elem1 = elem[i]
                        if(elem1._id==elem2){console.log(elem1)
                            array.push(elem1);
                            break;
                        }
                   }

                }
               return res.send({ data:array })
              })
              .catch((err) => next);

    })
    .catch((err) => next);
};

module.exports.postfavorites = (req, res, next) => {
  const { idproduct } = req.body;
  favorites.findOne({ userid: req.user._id })
    .then((product) => {
        let elem = product
        if(product!=null){
          elem.products.push(idproduct);
            favorites.updateOne({ userid: req.user._id }, { products: elem.products },{new: true,})
              .then(favorit => res.send({ data: favorit }))
              .catch(favorit => next); 
            return res.send({ data: elem })
        } else{
            return next(new EntryNotFound('Данная запись не найдена'))
        }
        })
    .catch(next);
};


module.exports.deletefavorites = (req, res, next) => {
    const { idproduct } = req.body;
    console.log(idproduct)
    favorites.findOne({ userid: req.user._id })
      .then((product) => {
          let elem = product
          if(product!=null){
              let array = []
              elem.products.forEach(element => {
                  if(element!=idproduct)
                  array.push(element);
              });
              favorites.updateOne({ userid: req.user._id }, { products: array },{new: true,})
                .then(favorit => res.send({ data: array }))
                .catch(favorit => next); 
          } else{
              return next(new EntryNotFound('Данная запись не найдена'))
          }
          })
      .catch(next);
  };