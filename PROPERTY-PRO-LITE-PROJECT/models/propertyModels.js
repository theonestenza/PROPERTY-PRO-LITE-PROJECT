const datetime = require('node-datetime');
import jwt from 'jsonwebtoken';
import config from 'config';
class property{
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.properties = [];
  }
  /**
   * 
   * @returns {object} property object
   */
  create(res,data,token) {
    //generate created at time
    const dt = datetime.create();
    const formatted = dt.format('m/d/Y H:M:S');
    const newId = this.properties.length + 1;

    let newProperty = {
      id: newId,
      owner: this.getUserId(res,token),
      status: data.status ,
      price: data.price ,
      state: data.state,
      city: data.city ,
      address: data.address ,
      type: data.type ,
      createdOn: formatted ,
      imageUrl: data.image_url 
      
      
    };
    this.properties.push(newProperty);
    newProperty = {'status':'success','data': newProperty};

    return newProperty;
  }
  
  getUserId(res,token){
    //decode token
    
    try {
      const decoded = jwt.verify(token,config.get('jwtSecret'));
      console.log(decoded);
      if(decoded.is_admin =='true'){
        return decoded.id;
      }
      return res.status(403).send({'status':'error','error':'Access denied.'});
  } catch (error) {
    return res.status(400).send({'status':'error','error':error.message});
  }

  }

  findOne(res,id) {
    const property = this.properties.find(property => property.id === parseInt(id)); 
   if(!property) return res.status(404).send({'status':'errror','message':'property is not found!'});
   return property;
  }

  //sortBy type
  sortByType(type){
    const result = this.properties.filter(function(obj) {
      return obj.type == type;
    });

    return result;
  }
  
  //Return all properties ASAP
  findAll() {
    return this.properties;
  }
  /**
   * 
   * @param {} id
   * @param {object} data 
   */
  update(res,id, data,token) {
  
   const property = this.properties.find(property => property.id === parseInt(id)); 
   if(!property) return res.status(404).send({'status':'errror','message':'property is not found!'});
    // Before you Update check if he/ she is the owner of property
    const owner_id = this.getUserId(res,token);
    if(!(property.owner == owner_id)){
      return res.status(403).send({'status':'errror','message':'Access denied!, You do not have permission to modify this property.'});
    }
    property.owner = owner_id;
    property.status = data.status || property.status;
    property.price = data.price || property.price;
    property.state = data.state || property.state;
    property.city = data.city || property.city;
    property.address = data.address || property.address;
    property.type = data.type || property.type;
    property.createdOn = data.createdOn || property.createdOn;
    property.image_url = data.image_url || property.image_url;
    return property;
  }

  deactivate(res,params,token){
     //check if property exists in our properties array
     const property = this.properties.find(property => property.id === parseInt(params.id)); 
   if(!property) return res.status(404).send({'status':'errror','message':'property is not found!'});
    // Before you mark it a sold check if he/ she is the owner of property
    const owner_id = this.getUserId(res,token);
    if(!(property.owner == owner_id)){
      return res.status(403).send({'status':'errror','message':'Access denied!, You do not have permission to modify this property.'});
    }
    //otherwise go ahead mark it as sold
    property.status = params.sold;
     return property;
  }
 
  delete(res,id,token) {
   //check if property exists in our properties array
   const property = this.properties.find(property => property.id === parseInt(id)); 
   if(!property) return res.status(404).send({'status':'errror','message':'property is not found!'});
    // Before deleting check if he/ she is the owner of property
    const owner_id = this.getUserId(res,token);
    if(!(property.owner == owner_id)){
      return res.status(403).send({'status':'error','message':'Access denied!, You do not have permission to modify this property.'});
    }
    //otherwise go ahead and remove property
    const index = this.properties.indexOf(property);
    this.properties.splice(index, 1);
    return res.status(200).send({'status':'success', 'data': { 'message':'property deleted successfully'}});
  }
}
export default new property();
