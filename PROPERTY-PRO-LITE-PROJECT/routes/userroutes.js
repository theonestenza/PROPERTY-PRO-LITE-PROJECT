import express from 'express';
import User from '../controllers/usercontrollers';
import propertycontrollers from '../controllers/propertycontrollers';

const router = express.Router();
// Create a user account  
router.post('/signup',User.signUp)
//login User
router.post('/signin',User.signIn)

export default router;

