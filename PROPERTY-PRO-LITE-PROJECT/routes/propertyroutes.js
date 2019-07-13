import express from 'express';
import Property from '../controllers/propertycontrollers';

import auth from '../middlewares/auth';
const router = express.Router();

// Agent: can Create Property 
router.post('/',auth,Property.create);
//Agent: can update property his advert
router.put('/:id',auth,Property.update);
// Agent: can mark his/her advert sold
router.patch('/:id/:sold',auth,Property.deactivate);
//Agent: can delete his or her property
router.delete('/:id',auth,Property.delete);
//User can see all adverts
router.get('/',Property.getAll);
//Get all property advertisement offering a specific type of property.
router.get('/id',Property.sortByType);
//Get a specific property advert
router.get('/:id',Property.getOne);
  //.get(Property.getAll);
// Get one property by id and delete property by id
//router.route('/:id').delete(Property.delete);
  //.get(Property.getOne)
  
//delete property by user who created the property


export default router;