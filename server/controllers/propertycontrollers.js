import propertyModel from '../models/propertyModels';

const property = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} property object 
   */
  create(req, res) {
    if (!req.body.owner && !req.body.status && !req.body.price && !req.body.state && !req.body.city && !req.body.address && !req.body.type && !req.body.createdOn && !req.body.imageUrl) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const property = propertyModel.create(req.body);
    return res.status(201).send(property);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} properties array
   */
  getAll(req, res) {
    const properties = propertyModel.findAll();
    return res.status(200).send(properties);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} property object
   */
  getOne(req, res) {
    const property = propertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({'message': 'property not found'});
    }
    return res.status(200).send(property);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated property
   */
  update(req, res) {
    const property = propertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({'message': 'property not found'});
    }
    const updatedProperty= propertyModel.update(req.params.id, req.body)
    return res.status(200).send(updatedProperty);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete(req, res) {
    const property = propertyModel.findOne(req.params.id);
    if (!property) {
      return res.status(404).send({'message': 'property not found'});
    }
    const ref = propertyModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

export default property;
