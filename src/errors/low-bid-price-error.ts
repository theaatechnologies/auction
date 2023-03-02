import {NotAllowedError} from "./not-allowed-error";

export class LowBidPriceError extends NotAllowedError {
  constructor() {
    super("LOW_BID_PRICE", "Bid price is lower than the item price.");
  }
}
