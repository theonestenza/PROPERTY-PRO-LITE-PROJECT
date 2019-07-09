import express from 'express';
import Property from '../controllers/propertycontrollers';

const router = express.Router();

// Create and fetch properties order 
router.route('/')
  .post(Property.create)
  .get(Property.getAll);
// Get one property by id and delete property by id
router.route('/:id')
  .get(Property.getOne)
  .delete(Property.delete);

// update property by user who created the property
router.put('/:id/update', Property.update);
//delete property by user who created the property
router.delete('/:id/delete', Property.delete);

export default router;