import {NotAllowedError} from "./not-allowed-error";

export class BidNotAllowedError extends NotAllowedError {
  constructor() {
    super("BID_NOT_ALLOWED", "Current bid is not allowed.");
  }
}
