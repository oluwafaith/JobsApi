import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import createError, { HttpError } from  'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from  'morgan';
import helmet from 'helmet';
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize"

import  authenticateUser from'./middleware/authentication'
import indexRouter from './routes/index';
import jobsRouter from './routes/jobs';
import authRouter from './routes/auth';

const app = express();


// view engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));



app.use(express.json({ limit: '10kb' }));

app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticateUser, jobsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
