import catchAsync from '../util/catchAsync.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';



export const adminProfilePage = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/profile');
});





