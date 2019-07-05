import uuid from 'uuid';

class flag {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.flags = [];
  }
  /**
   * 
   * @returns {object} flag object
   */
  create(data) {
    const newFlag = {
      id: uuid.v4(),
    propertyId: data.propertyId || '',
    createdOn: data.createdOn || '',
    reason: data.reason || '',
      description: data.description || '',
    };
    this.flags.push(newFlag);
    return newFlag;
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} flag  object
   */
  findOne(id) {
    return this.flags.find(u => u.id === id);
  }
  /**
   * @returns {object} returns all flags
   */
  findAll() {
    return this.flags;
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const flag = this.findOne(id);
    const index = this.flags.indexOf(flag);
    this.flags[index].propertyId = data['propertyId'] || flag.propertyId;
    this.flags[index].createdOn = data['createdOn'] || flag.createdOn;
    this.flags[index].reason = data['reason'] || flag.reason;
    this.flags[index].description = data['description'] || flags.description;
    return this.flags[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const flag = this.findOne(id);
    const index = this.flags.indexOf(flag);
    this.flags.splice(index, 1);
    return {};
  }
}
export default new flag();
