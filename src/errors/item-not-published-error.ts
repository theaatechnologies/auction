import {NotAllowedError} from "./not-allowed-error";

export class ItemNotPublishedError extends NotAllowedError {
  constructor() {
    super("ITEM_NOT_PUBLISHED", "Item has not been published.");
  }
}
