import propertyModel from '../models/propertyModels';
import Joi from 'Joi';
const property = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} property object 
   */
  create(req, res) {
    
   const schema = {
    status: Joi.string().required(),
    price: Joi.number().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    type: Joi.string().required(),
    image_url: Joi.string().required()
   };
   const result = Joi.validate(req.body, schema);
    if(result.error == null){

      const property = propertyModel.create(res,req.body,req.header('x-auth-token'));
      return res.status(201).send(property);
      
   }else{
   return res.status(400).send({'status':'error','error': `${result.error.details[0].message}`}); 
}

  },
  //sort method
  sortByType(req,res){
   const properties = propertyModel.sortByType(req.query.type);
    if(properties.length == 0){
      return res.status(200).send({'status': 0,'data':properties});
    }
    return res.status(200).send({'status': 1,'data':properties});
  },

deactivate(req,res){
  /*
  console.log(req.header('x-auth-token'));
  console.log(req.params);
  return res.status(400).send({'status':'error','error': 'test'}); 
  */
 const property = propertyModel.deactivate(res,req.params,req.header('x-auth-token'));
 return res.status(201).send(property);
},

   //grab all available properties controller method
  getAll(req, res) {
    const properties = propertyModel.findAll();
    if(properties.length == 0){
      return res.status(200).send({'status': 0,'data':properties});
    }
    return res.status(200).send({'status': 1,'data':properties});
  },
  
  //Get a specific property
  getOne(req, res) {
    const property = propertyModel.findOne(res,req.params.id);
    if (!property) {
      return res.status(404).send({'status':'error','message': 'property not found'});
    }
    return res.status(200).send(property);
  },
  
  //Update controller function
  update(req, res) {
  
   const schema = {
    status: Joi.string().optional(),
    price: Joi.number().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    address: Joi.string().optional(),
    type: Joi.string().optional(),
    image_url: Joi.string().optional()
   };
   const result = Joi.validate(req.body, schema);
    if(result.error == null){
      const updatedProperty = propertyModel.update(res,req.params.id,req.body,req.header('x-auth-token'));
      return res.status(201).send(updatedProperty); 
   }else{
   return res.status(400).send({'status':'error','error': `${result.error.details[0].message}`}); 
}

  },
  //Controller function for delete property
  delete(req, res) {
    propertyModel.delete(res,req.params.id,req.header('x-auth-token'));
   
  }
}

export default property;
