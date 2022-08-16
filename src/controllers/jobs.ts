import {Request, Response} from 'express'

const   getAllJobs = async (req :Request, res: Response) => {

  res.send('register')
}
const getJob = async (req :Request, res: Response) => {

  res.send('register')
}
const createJob = async (req :Request, res: Response) => {

  res.send('register')
}
const updateJob = async (req :Request, res: Response) => {

  res.send('register')
}

const deleteJob = async (req:Request, res: Response) => {
  
  res.send('login')
}

export  {
 createJob, updateJob, deleteJob,getAllJobs,getJob
}
