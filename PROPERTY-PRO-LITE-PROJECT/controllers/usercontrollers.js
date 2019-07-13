import userModel from '../models/userModels';
import Joi from 'joi';

const User = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  signUp(req, res) {
 
   const schema = {
       first_name: Joi.string().required(),
       last_name: Joi.string().required(),
       email: Joi.string().email().required(),
       password: Joi.required(),
       phoneNumber: Joi.number().required(),
       address: Joi.string().required(),
       is_admin: Joi.boolean().required()
      };
  const result = Joi.validate(req.body, schema);
   if(result.error == null){
    const user = userModel.createUser(req.body);
    return res.status(201).send(user);
   }else{
    return res.status(400).send({'status':'error','error': `${result.error.details[0].message}`}); 
   }
  },

  signIn(req, res) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.required(),
       };
   const result = Joi.validate(req.body, schema);
    if(result.error == null){
     const user = userModel.loginUser(req.body);

     if(user.status == 'success'){
      return res.status(200).send(user);
     }else{
      return res.status(401).send(user);
     }
     

    }else{
     return res.status(400).send({'status':'error','error': `${result.error.details[0].message}`}); 
    }
   }
}

export default User;
