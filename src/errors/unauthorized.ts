import CustomAPIError from "./custom-api";

class UnauthorizedError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = 403;
  }
}

export default UnauthorizedError;
