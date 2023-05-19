import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail } = validator;

const { Schema, model } = mongoose;

const applicationSchema = new Schema({
  name: {
    type: String,
    required: [true, ' Please Provide your name!!']
  },
  number: {
    type: String,
    required: [true, ' Please Provide your phone number!!']
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email!!'],
    validate: [isEmail, 'Please! provide valid email']
  },
  letter: {
    type: String
  },
  resume: {
    type: String,
    required: [true, ' Please Provide your resume!!']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Application = model('Application', applicationSchema);

export default Application;
