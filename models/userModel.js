import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

const { isEmail } = validator;
const { randomBytes, createHash } = crypto;
const { hash, compare } = bcryptjs;
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  nationality: {
    type: String,
  },
  email: {
    type: String,
    sparse: true
    // required: [true, 'Please! provide your email.'],
    // unique: true,
    // lowercase: true,
    // validate: [isEmail, 'Please! provide valid email']
  },
  image: String,
  password: {
    type: String,
    // required: [true, 'Please! provide password'],
    minlength: 8,
    select: false
  },
  password_confirm: {
    type: String,
    // required: [true, 'Please provide confirm password!!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password does not match'
    }
  },
  phoneNumber: {
    type: String,
  },
  Age: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  gender: {
    type: String,
  },

  isVerified: {
    type: String,
  },

  passport_nationalID: {
    type: String,
  },
  identification_document: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await hash(this.password, 12);
  this.password_confirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = randomBytes(32).toString('hex');

  this.passwordResetToken = createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = model('User', userSchema);

export default User;
