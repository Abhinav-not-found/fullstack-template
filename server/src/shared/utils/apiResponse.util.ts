import type { Response } from "express";

class ApiResponse {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data?: unknown | null;
  public readonly success: true;

  constructor(
    statusCode: number = 200,
    message: string = "Success",
    data: unknown | null = null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
  
  send(res: Response) {
    res.status(this.statusCode).json(this);
  }

  static ok(message: string = "Success", data: unknown | null = null) {
    return new ApiResponse(200, message, data);
  }
  static created(
    message: string = "New resource created",
    data: unknown | null = null,
  ) {
    return new ApiResponse(201, message, data);
  }
}

export default ApiResponse;
