import { CustomError } from 'ts-custom-error'
import {StandardError} from "src/errors/error";

export abstract class NotFoundError extends CustomError {
  public statusCode: number;
  public message: string;


  constructor(errorCode: string, message: string) {
    super(message);
    this.statusCode = 404;
    this.message = message;
  }
}
