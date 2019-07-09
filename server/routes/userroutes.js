import express from 'express';
import User from '../controllers/usercontrollers';
import propertycontrollers from '../controllers/propertycontrollers';
import flagcontrollers from '../controllers/flagcontrollers';

const router = express.Router();
// Create a user account  
router.post('/',User.create)
//get all users 
router.get('/', User.getAll);
// Get and delete a user
router.route('/:id')
  .get(User.getOne)
  .delete(User.delete);

export default router;

