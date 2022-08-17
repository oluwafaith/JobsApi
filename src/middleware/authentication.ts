import { Request, Response, NextFunction } from 'express'
// import  User from '../models/User'
import  jwt from 'jsonwebtoken'
import  UnauthenticatedError  from '../errors/unauthenticated'

const auth = async (req:any, res:Response, next:NextFunction) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]

  const secret:any = process.env.JWT_SECRET
 
  try {
    const payload: any = jwt.verify(token, secret)
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

export default auth
