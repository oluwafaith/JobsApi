import { Request, Response, NextFunction } from "express";
import { Job } from "../models/Job";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { catchAsync } from "../utils/catchAsync";

const getAllJobs = catchAsync(async (req: any, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

const getJob = catchAsync(async (req: any, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

const createJob = catchAsync(async (req: any, res: Response) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
});

const updateJob = catchAsync(async (req: any, res: Response) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

const deleteJob = catchAsync(async (req: any, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
});

export { createJob, deleteJob, getAllJobs, updateJob, getJob };
