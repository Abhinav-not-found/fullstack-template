class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: unknown[];
  public readonly success = false;

  constructor(
    statusCode: number = 500,
    message: string = "Internal Server Error",
    errors: unknown[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.name = "ApiError";

    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message = "Bad request", errors: unknown[] = []) {
    return new ApiError(400, message, errors);
  }

  static unAuthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static tooManyRequests(message = "Too Many Requests") {
    return new ApiError(429, message);
  }

  static validation(message = "Validation Failed", errors: unknown[] = []) {
    return new ApiError(422, message, errors);
  }
  // Example:
  //   throw ApiError.validation("Email already exists", [
  // 	{ field: "email", message: "Already taken" }
  //  ]);

  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }

  static serviceUnavailable(message = "Service Unavailable") {
    return new ApiError(503, message);
  }
}

export default ApiError;
