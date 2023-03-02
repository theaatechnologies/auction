import { NotFoundError } from "./not-found-error";

export class ItemNotFoundError extends NotFoundError {
  constructor() {
    super("ITEM_NOT_FOUND", "Item not found");
  }
}
