import CustomAPIError from "./custom-api";

class UnauthenticatedError extends CustomAPIError {
  statusCode: any;
  constructor(message: any) {
    super(message);
    this.statusCode = 401;
  }
}
export default UnauthenticatedError;
