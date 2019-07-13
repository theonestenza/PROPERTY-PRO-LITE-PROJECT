import jwt from 'jsonwebtoken';
import config from '../config/default.json';
import lodash from 'lodash';
class user {

  constructor() {
    this.users = [];
  }
  /**
   ****** @param {object} data
   ***** @returns {object} user object
   */
  createUser(data) {
    const currentId = this.users.length + 1;
    
      let newUser = {  
      token: this.generateAuthToken(currentId,data.is_admin), 
      id: currentId,
      first_name: data.first_name ,
      last_name: data.last_name, 
      email: data.email,
      password: data.password
    };
     this.users.push(newUser);
     newUser = {'status':'success',
     'data': lodash.pick(newUser,['token','id',
     'first_name','last_name','email'])};
     
    return newUser;
  }

  loginUser(data) {
    //check if user email and password exists
    //in our users array
    
    const user = this.users.find(user => (user.email === data.email)&&((user.password === data.password)));
     if(!user) {
       return {'status':'error','error':
        'email or password is incorrect!.'};  
     }else{
         
      let result = {  
        token: this.generateAuthToken(user.id,user.is_admin), 
        id: user.id,
        first_name: user.first_name ,
        last_name: user.last_name, 
        email: data.email
      };
       result = {'status':'success','data': result};
       
      return result;
     }  
     
  }


  //function to generate token
  generateAuthToken(id,admin){
     const token  = jwt.sign({id: id,is_admin:admin},config.jwtSecret);
     return token;
  }
  /**
   * 
   * @param {} id
   * @returns {object} user  object
   */
  findOne(id) {
    return this.users.find(u => u.id === id);
  }
  /**
   *+9+ @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }
  /**
   * 
   * @param {} id
   * @param {object} data 
   */
  update(id, data) {
    
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users[index].firstName = data['firstName'] || user.firstName;
    this.users[index].lastName = data['lastName'] || user.lastName;
    this.users[index].password = data['password'] || user.password;
    this.users[index].email = data['email'] || user.email;
    return this.users[index];
  }
  /**
   * 
   * @param {} id 
   */
  delete(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {
     'status':'success', message:'user deleted successfully'
    };
  }
}
export default new user();
