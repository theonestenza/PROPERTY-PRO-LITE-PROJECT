import flagModel from '../models/flagModels';

const flag = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} flag object 
   */
  create(req, res) {
    if (!req.body.propertyId && !req.body.createdOn && !req.body.reason && !req.body.description) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const flag = flagModel.create(req.body);
    return res.status(201).send(flag);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} flag array
   */
  getAll(req, res) {
    const flags = flagModel.findAll();
    return res.status(200).send(flags);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} flag object
   */
  getOne(req, res) {
    const flag = flagModel.findOne(req.params.id);
    if (!flag) {
      return res.status(404).send({'message': 'flag not found'});
    }
    return res.status(200).send(flag);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated flag
   */
  update(req, res) {
    const flag = flagModel.findOne(req.params.id);
    if (!flag) {
      return res.status(404).send({'message': 'flag not found'});
    }
    const updatedFlag= flagModel.update(req.params.id, req.body)
    return res.status(200).send(updatedFlag);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const flag = flagModel.findOne(req.params.id);
    if (!flag) {
      return res.status(404).send({'message': 'flag not found'});
    }
    const ref = flagModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

export default flag;
