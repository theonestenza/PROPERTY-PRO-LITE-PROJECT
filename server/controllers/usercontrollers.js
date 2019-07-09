import userModel from '../models/userModels';

const User = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  create(req, res) {
    if (!req.body.firstName
     && !req.body.lastName
     && !req.body.email
     && !req.body.password) {
      return res.status(400).send({'status':'error','error': 'All fields are required'});
    }
    const user = userModel.create(req.body);
    return res.status(201).send(user);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} user array
   */
  getAll(req, res) {
    const users = userModel.findAll();
    return res.status(200).send(users);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object
   */
  getOne(req, res) {
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({'status':'error','error': 'user not found'});
    }
    return res.status(200).send(user);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated user
   */
  update(req, res) {
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({'message': 'user not found'});
    }
    const updatedUser= userModel.update(req.params.id, req.body)
    return res.status(200).send(updatedUser);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const user = userModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).send({'message': 'user not found'});
    }
    const ref = userModel.delete(req.params.id);
    return res.status(200).send(ref);
  }
}

export default User;
