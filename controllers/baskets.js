const orders = require('../models/orders');
const baskets = require('../models/baskets');
const products = require('../models/products');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getbaskets = (req, res, next) => {
  console.log("Начало метода1")
        let array = []
  baskets.findOne({ userid: req.user._id })
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

module.exports.postbaskets = (req, res, next) => {
  const { idproduct } = req.body;
  baskets.findOne({ userid: req.user._id })
    .then((product) => {
        let elem = product
        if(product!=null){
          elem.products.push(idproduct);
            baskets.updateOne({ userid: req.user._id }, { products: elem.products },{new: true,})
              .then(favorit => res.send({ data: favorit }))
              .catch(favorit => next); 
            return res.send({ data: elem })
        } else{
            return next(new EntryNotFound('Данная запись не найдена'))
        }
        })
    .catch(next);
};


module.exports.deletebaskets = (req, res, next) => {console.log("123")
    const { idproduct } = req.body;
    console.log(idproduct)
    baskets.findOne({ userid: req.user._id })
      .then((product) => {
          let elem = product
          if(product!=null){
              let array = []
              elem.products.forEach(element => {
                  if(element!=idproduct)
                  array.push(element);
              });
              baskets.updateOne({ userid: req.user._id }, { products: array },{new: true,})
                .then(favorit => res.send({ data: array }))
                .catch(favorit => next); 
          } else{
              return next(new EntryNotFound('Данная запись не найдена'))
          }
          })
      .catch(next);
  };


  module.exports.postbuybaskets = (req, res, next) => {
    const { basketsdates } = req.body;
    if(basketsdates[0].length == basketsdates[1].length)
    baskets.findOne({ userid: req.user._id })
      .then((product) => {
          let elem = product
          if(product!=null){
                baskets.updateOne({ userid: req.user._id }, { products: [] },{new: true,})
                .then(favorit => {})
                .catch(favorit => next);

                orders.create({ userid:req.user._id, products:basketsdates[0], quantityproducts:basketsdates[1], date:new Date() })
                .then((product) => {res.send({ data: product })})
                .catch(next);

          } else{
              return next(new EntryNotFound('Данная запись не найдена'))
          }
          })
      .catch(next);
  };