import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next) {
  res.render("index", { title: "Jobs Application" });
});

export default router;
