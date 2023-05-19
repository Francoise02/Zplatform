import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import userModel from '../models/userModel.js';
import { fileUpload } from '../util/multer.js';


export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await userModel.find({ active: true });
  if (!users) {
    return next(new AppError('No users yet', 404));
  }
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await userModel.find({ _id: req.params.id, active: true });
  if (!user || user.length === 0) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: {
      user
    }
  });
});


export const getMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  // const existingUser = await userModel.find({ email: req.body.email });
  // if (existingUser.length > 0 && req.user.email !== req.body.email) {
  //   return next(new AppError('The email already exists!!', 409));
  // }
  const user = await userModel.findById(req.user.id);
  if (req.file) user.image = await fileUpload(req);
  
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

export const verifyUser = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  user.passport_nationalID = req.body.passport_nationalID;
  if (req.file) {user.identification_document = await fileUpload(req)} 
  else { return next(new AppError('Upload passport/id copy', 400)) };
  // user.isVerified = "PENDING VERIFICATION";
  if (!passport_nationalID) {
    return next(new AppError('Enter passport/id number for verification', 400));
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user.id, {
    active: false
  });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
