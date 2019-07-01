import uuid from 'uuid';

class user {
  /**
   * class constructor
   * 
   */
  constructor() {
    this.users = [];
  }
  /**
   * @param {object} data
   * @returns {object} user object
   */
  create(data) {
    let newUser = { 
      id: uuid.v4(), 
    firstName: data.firstName ,
    lastName: data.lastName ,
    email: data.email ,
      password: data.password ,   
    };
    this.users.push(newUser);
     //construct data output
     
     //const data = [];
     
     newUser = {'status':'success','data': newUser};
     


    return newUser;
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} user  object
   */
  findOne(id) {
    return this.users.find(u => u.id === id);
  }
  /**
   * @returns {object} returns all users
   */
  findAll() {
    return this.users;
  }
  /**
   * 
   * @param {uuid} id
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
   * @param {uuid} id 
   */
  delete(id) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    return {
      message: 'user deleted successfully',
    };
  }
}
export default new user();
