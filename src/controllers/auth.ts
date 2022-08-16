import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import {User} from "../models/User"
// import {BadRequestError, UnauthenticatedError} from "../errors/index"
const register = async (req :Request, res: Response) => {
const user = await User.create({...req.body})
  res.status(StatusCodes.CREATED).json({user})
}

const login = async (req:Request, res: Response) => {
  
  res.send('login')
}

export  {
  register,
  login,
}
