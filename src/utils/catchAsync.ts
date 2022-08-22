export const catchAsync = (fn: any) => {
    return (
      req: Express.Request,
      res: Express.Response,
      next: Express.Application
    ) => {
      fn(req, res, next).catch(next);
    };
  };