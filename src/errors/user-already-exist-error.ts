import { NotAllowedError } from "./not-allowed-error";

export class UserAlreadyExistError extends NotAllowedError {
  constructor() {
    super("USER_AlREADY_EXISTS", "User already exists.");
  }
}
