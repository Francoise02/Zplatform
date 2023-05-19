import express from 'express';
import {
  signupPage,
  loginPage,
  forgotPage,
  resetpassword,
  editprofilePage,
} from '../controllers/viewController.js';

import { isLoggedIn, protect } from '../controllers/authController.js';
import {
  adminProfilePage,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', signupPage);
router.use(isLoggedIn);
router.get('/login', loginPage);
router.get('/forgot', forgotPage);
router.get('/resetpassword/:token', resetpassword);
router.get('/profile', protect, adminProfilePage);
router.get('/profile/edit', protect, editprofilePage);


export default router;
