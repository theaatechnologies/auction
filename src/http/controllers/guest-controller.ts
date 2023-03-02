import {NextFunction, Response, Router} from "express";
import {injectable} from "inversify";
import {BiddingService} from "src/services/bidding-service";
import {sendError} from "src/utils/response";


@injectable()
export class GuestController {
    public readonly router: Router;
    private biddingService: BiddingService;


    constructor(biddingService: BiddingService) {
        this.router = Router();
        this.router.get("/bids", this.getAllCompletedBids.bind(this));
        this.biddingService = biddingService;
    }

    private async getAllCompletedBids(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("Get all completed bids for guest request...");

            const bids = await this.biddingService.getAllCompleted();
            return res.status(200).json({
                bids
            });
        } catch (e) {
            sendError(res, e);
        }
    }
}