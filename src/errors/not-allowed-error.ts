import { CustomError } from 'ts-custom-error'

export abstract class NotAllowedError extends CustomError {
  public statusCode: number;

  constructor(errorCode: string, message: string) {
    super(message);
    this.statusCode = 400;
  }
}
