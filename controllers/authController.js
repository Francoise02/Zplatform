import jsonwebtoken from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { promisify } from 'util';
import catchAsync from '../util/catchAsync.js';
import AppError from '../util/AppError.js';
import Email from '../util/email.js';
import userModel from '../models/userModel.js';
import { signupAuthSchema } from '../util/signupValidate.js';
import bcryptjs from "bcryptjs"

const { hash, compare } = bcryptjs;
const { sign, verify } = jsonwebtoken;
const User = userModel
const signToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  await signupAuthSchema.validateAsync(req.body);

  if (!req.body.password || !req.body.email) {
    return next(new AppError('Please fill empty fields!', 400));
  }
  // const userEmailExist = await userModel.findOne({ where: { email: req.body.email } });
  // if (userEmailExist) return next(new AppError('Email already registered!', 409));

  const verificationToken = randomBytes(32).toString('hex');
  req.body.verificationToken = createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  req.body.isVerified = "UNVERIFIED";
  req.body.image = "http://res.cloudinary.com/francoise/image/upload/v1684350424/sf8qlmzhmt11fpyiseup.png"
  req.body.password = await hash(req.body.password, 12);
  const email = req.body.email;
  const createUser = await User.create(req.body, {
    individualHooks: true,
  });
  const user = await userModel
    .findOne({ email })
    .select('+password')
    .select('+active');

  // const url = `${req.protocol}://${req.get(
  //   'host',
  // )}/api/v1/user/auth/verify-email/${verificationToken}`;

  // try {
  //   await new Email(createUser, url).sendWelcome();
  // } catch (err) {
  //   console.log(err);
  // }

  createSendToken(user, 201, res);
  // createNotification(
  //   createUser.id,
  //   'welcome to Company Z',
  //   'Your safety is our high priority, so please verify your email',
  // );
});



export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return next(new AppError('Please fill empty fields!', 400));
  }

  const user = await userModel
    .findOne({ email })
    .select('+password')
    .select('+active');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Wrong email or password!', 401));
  if (user.active === false) {
    user.active = true;
    await user.save({ validateBeforeSave: false });
  }

  createSendToken(user, 200, res);
});

export function logout(req, res) {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', data: null });
}

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.body.jwt) {
    token = req.body.jwt;
  }
  if (!token || token === 'loggedout') {
    return next(
      new AppError('You are not logged in! please login to get access', 401)
    );
  }
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);

  const currentUser = await userModel.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});


export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/user/resetpassword/${resetToken}`;

  const resetRootURL = `${req.protocol}://${req.get(
    'host'
  )}/resetpassword/${resetToken}`;

  try {
    await new Email(user, resetURL, resetRootURL).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'token send to Email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error sending email. Try again later.', 500)
    );
  }
});



export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.password_confirm = req.body.password_confirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});






export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(req.body.password_current, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.password_confirm = req.body.password_confirm;
  await user.save();

  createSendToken(user, 200, res);
});

export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    try {
      const decoded = await promisify(jsonwebtoken.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await userModel.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      if (currentUser.passwordChangedAt) {
        const passwordChangedAt = parseInt(
          currentUser.passwordChangedAt / 1000,
          10
        );

        if (decoded.iat < passwordChangedAt) {
          return next();
        }
      }

      res.locals.user = currentUser;
      next();
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};
