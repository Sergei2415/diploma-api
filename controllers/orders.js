
const orders = require('../models/orders');
const products = require('../models/products');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getorders = (req, res, next) => {
  console.log("Начало метода1")
        let array = []
        let array1 = []
  orders.find({ userid: req.user._id })
    .then((product) => {
      if (product == null) return next(new EntryNotFound('Данная запись не найдена'));
            products.find({})
            .then((elem) => {
                for(let j = 0;j<product.length;j++){
                    let elem2 = product[j]
                    for(let k = 0;k<elem2.products.length;k++){
                        let elem3 = product[j].products[k]
                        for(let i = 0;i<elem.length;i++){
                            let elem1 = elem[i]
                                if(elem1._id==elem3){
                                    array1.push(elem1);

                                    break;
                                }
                        }
                    }

                    array.push(array1);
                    array1.push(elem2.quantityproducts)
                    array1.push(elem2.date)
                    array1.push(elem2._id)
                    array1 = []

                }
                //console.log(array)
               return res.send(array)
              })
              .catch((err) => next);

    })
    .catch((err) => next);
};
