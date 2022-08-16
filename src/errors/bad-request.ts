import CustomAPIError from "./custom-api";

class BadRequestError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
