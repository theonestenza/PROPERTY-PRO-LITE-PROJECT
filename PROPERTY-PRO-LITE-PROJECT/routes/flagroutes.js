import express from 'express';
import Flag from '../controllers/flagcontrollers';

const router = express.Router();

// Create and fetch flags 
router.route('/')
  .post(Flag.create)
  .get(Flag.getAll);
// Get one flag by id and delete flag by id
router.route('/:id')
  .get(Flag.getOne)
  .delete(Flag.delete);

// update flag by user who created the flag
router.put('/:id/update', Flag.update);
//delete flag by user who created the flag
router.delete('/:id/delete', Flag.delete);

export default router;