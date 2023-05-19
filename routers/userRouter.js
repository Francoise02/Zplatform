import express from 'express';
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  
} from '../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  updateUser,
  verifyUser,
  deleteMe,
  getMe
} from '../controllers/userController.js';
import { uploads } from '../util/multer.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

router.use(protect);
router.get('/me', getMe);
router.patch('/updatepassword', updatePassword);
router.route('/updateMe').patch(uploads.single("image"), updateUser);
router.route('/verifyMe').patch(uploads.single("image"), verifyUser);
router.route('/deleteMe').delete(deleteMe);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

export default router;
