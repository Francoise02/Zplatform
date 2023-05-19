import catchAsync from '../util/catchAsync.js';
import mongoose from 'mongoose';
import AppError from '../util/AppError.js';

const metaTags = {
    title: "",
    description:""
};

export const signupPage = catchAsync(async (req, res, next) => {
  metaTags.title = "Sign up - Company Z";
  metaTags.description = null;
  res.status(200).render('signup', {
    metaTags
  });
});

export const loginPage = catchAsync(async (req, res, next) => {
  metaTags.title = "Login - Company Z";
  metaTags.description = null;
  res.status(200).render('login', {
    metaTags
  });
});

export const resetpassword = catchAsync(async (req, res, next) => {
  metaTags.title = "Reset password - Company Z";
  metaTags.description = null;
  const { token } = req.params;
  res.status(200).render('reset-password', {
    token,
    metaTags
  });
});

export const forgotPage = catchAsync(async (req, res, next) => {
  metaTags.title = "Forgot password - Company Z";
  metaTags.description = null;
  res.status(200).render('forgot-password', {
    metaTags
  });
});

export const editprofilePage = catchAsync(async (req, res, next) => {
  metaTags.title = "Edit profile - Company Z";
  metaTags.description = null;
  res.status(200).render('editprofile', {
    metaTags
  });
});