import uuid from 'uuid';

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
  create(data) {
    const newProperty = {
      id: uuid.v4(),
    owner: data.owner || '',
    status: data.status || '',
    price: data.price || '',
      state: data.state|| '',
      city: data.city || '',
      address: data.address || '',
      type: data.type || '',
      createdOn: data.createdOn || '',
      imageUrl: data.imageUrl || '',
      
    };
    this.properties.push(newProperty);
    return newProperty
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} property  object
   */
  findOne(id) {
    return this.properties.find(p => p.id === id);
  }
  /**
   * @returns {object} returns all properties
   */
  findAll() {
    return this.properties;
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const property= this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].owner = data['owner'] || property.owner;
    this.properties[index].status = data['status'] || property.status;
    this.properties[index].price = data['price'] || property.price;
    this.properties[index].state = data['state'] || property.state;
    this.properties[index].city = data['city'] || property.city;
    this.properties[index].address = data['address'] || property.address;
    this.properties[index].type = data['type'] || property.type;
    this.properties[index].createdOn = data['createdOn'] || property.createdOn;
    this.properties[index].imageUrl= data['imageUrl'] || property.imageUrl;
    return this.properties[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties.splice(index, 1);
    return {};
  }
}
export default new property();
