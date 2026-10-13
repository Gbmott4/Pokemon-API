export interface AppErrorDetail {
  field: string;
  message: string;
}

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly details?: AppErrorDetail[];

  constructor(message: string, statusCode = 400, details?: AppErrorDetail[]) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}
