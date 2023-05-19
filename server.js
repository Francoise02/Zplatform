/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import moongose from 'mongoose';
import "dotenv/config";
import open from "open";

import app from './app.js';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

if (process.env.NODE_ENV === 'production') {
  moongose.connect(DB).then(() => console.log('DB connected successfully !!'));
} else if (process.env.NODE_ENV === 'development') { 
  moongose
    .connect('mongodb://localhost:27017/users-new-db')
    .then(() => console.log('DB connected successfully !'));
}

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

  // if (process.env.NODE_ENV === "development") {
  //   open(`http://localhost:${port}`);
  // }

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
