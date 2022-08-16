import CustomAPIError from "./custom-api";

class NotFoundError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
