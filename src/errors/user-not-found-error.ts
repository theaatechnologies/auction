import { NotFoundError } from "./not-found-error";

export class UserNotFoundError extends NotFoundError {
  constructor() {
    super("USER_NOT_FOUND", "User not found");
  }
}
