import express from "express";
const router = express.Router();

import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJob,
} from "../controllers/jobs";

router.route("/")
.post(createJob)
.get(getAllJobs);

router.route("/:id")
.get(getJob)
.delete(deleteJob)
.patch(updateJob);



export default router;
