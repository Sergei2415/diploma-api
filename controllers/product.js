
const products = require('../models/products');
const { AccessDenied } = require('../errors/AccessDenied');
const { EntryNotFound } = require('../errors/EntryNotFound');
const users = require('../models/users');
module.exports.getproducts = (req, res, next) => {
  console.log("Начало метода")
  products.find({  })
    .then((product) => {
      let discounts=0,nodiscounts=0;
      let objectdiscounts=[],objectnodiscounts=[];
        for(let i = 0; i < product.length; i++){
          let elem = product[i];
        if(elem.discount != undefined){
          if(discounts<12){
          discounts+=1;
          objectdiscounts.push(elem);            
          } 
        } else if(elem.discount == undefined&&nodiscounts<12){
          nodiscounts+=1;
          objectnodiscounts.push(elem);          
        }else{
          console.log(elem.discount)
          break}
      }
      res.send({ objectdiscounts, objectnodiscounts })
    })
    .catch(next);
};



module.exports.getusersall = (req, res, next) => {
  if("60b52ca56999880aa51d9106" == req.user._id){
  users.find({  })
    .then((product) => { console.log(product)
      res.send(product)
    })
    .catch(next);
  } else{
    return next(new AccessDenied('Ваш токен был написан с ошибкой, просрочен, либо не имеет прав администратора.'))
  }
};



module.exports.getproductsall = (req, res, next) => {
  if("60b52ca56999880aa51d9106" == req.user._id){
  products.find({  })
    .then((product) => {
      res.send(product)
    })
    .catch(next);
  } else{
    return next(new AccessDenied('Ваш токен был написан с ошибкой, просрочен, либо не имеет прав администратора.'))
  }
};


module.exports.deleteproduct = (req, res, next) => {
  if("60b52ca56999880aa51d9106" == req.user._id){
  products.findByIdAndRemove(req.params.id)
  .then(user => res.send(user))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
  } else{
  return next(new AccessDenied('Ваш токен был написан с ошибкой, просрочен, либо не имеет прав администратора.'))
  }
};


module.exports.findproducts = (req, res, next) => {
  console.log("Начало метода2")
  console.log(req.body)
  const { findtext } = req.body;
  console.log(findtext)
  products.find({  })
    .then((product) => {
      let objsearch=[];

      product.forEach(elem=>{        
        //console.log(product.length)
        if(elem.title == findtext||elem.country == findtext||elem.category == findtext||elem.brand == findtext)
          objsearch.push(elem);   
        //console.log(elem)
      })
      return res.send({ objsearch })
    })
    .catch(next);
};
module.exports.postproducts = (req, res, next) => {
  if("60b52ca56999880aa51d9106" == req.user._id){
  const {
    title, description, country, category, brand, deadline, storage, temperature, image, measurement, price, discount
  } = req.body;
  products.create({
    title, description, country, category, brand, deadline, storage, temperature, image, measurement, price, discount
  })
    .then((product) => res.send({ data: product }))
    .catch(next);
  } else{
    return next(new AccessDenied('Ваш токен был написан с ошибкой, просрочен, либо не имеет прав администратора.'))
  }
};
module.exports.infproductsId = (req, res, next) => {
  products.findById(req.params.id)
    .then((product) => {
      if (product == null) return next(new EntryNotFound('Данная запись не найдена'));
       res.send({ data: product });
    })
    .catch(next);
};
