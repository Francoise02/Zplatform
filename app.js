import express, { json as _json } from 'express';
import morgan from 'morgan';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import viewRouter from './routers/viewRouter.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './util/AppError.js';
import userRouter from './routers/userRouter.js';

const { urlencoded, json } = bodyParser;

const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.enable('trust proxy');

app.use(function (req, res, next) { 
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(urlencoded({ extended: false }));

app.use(_json());

app.use(json());
app.use(cookieParser());
app.use(xss());

app.use(compression());

app.set('view engine', 'ejs'); 
app.set('views', ['./views', './views/admin']);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1/user/', userRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Opps! can't find "${req.originalUrl}" on this server!`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
      