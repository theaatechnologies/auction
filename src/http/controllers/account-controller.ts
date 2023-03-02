import {NextFunction, Response, Router} from "express";
import {UsersService} from "../../services/users-service";
import {injectable} from "inversify";
import {AccountService} from "src/services/account-service";
import {ItemService} from "src/services/item-service";
import {ItemInput} from "src/model/item-input";
import {BiddingService} from "src/services/bidding-service";
import {BiddingInput} from "src/model/Bidding-input";
import {sendError} from "src/utils/response";
import {UserNotFoundError} from "src/errors/user-not-found-error";
import {
    Body,
    Controller, Example,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Response as ApiResponse,
    Request as ApiRequest
} from "tsoa";

const jwtSecret: string = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;

@injectable()
@Route("/account")
export class AccountController {
    public readonly router: Router;
    private accountService: AccountService;
    private usersService: UsersService;
    private itemService: ItemService;
    private biddingService: BiddingService;


    constructor(usersService: UsersService, accountService: AccountService, itemService: ItemService, biddingService: BiddingService) {
        this.router = Router();
        this.router.post("/deposit", this.deposit.bind(this));
        this.router.post("/item", this.createItem.bind(this));
        this.router.post("/publish", this.publishItem.bind(this));
        this.router.post("/bid", this.bid.bind(this));
        this.router.get("/bids", this.getAllBids.bind(this));
        this.accountService = accountService;
        this.usersService = usersService;
        this.itemService = itemService;
        this.biddingService = biddingService;
    }

    @Example<object>({
        email: "test@gmail.com",
        deposit: "1"
    })
    @Post("/deposit")
    @SuccessResponse("204", "Updated")
    @ApiResponse<UserNotFoundError>(404 )
    public async deposit(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("deposit request...", req.body);
            const email = req.body.email;
            const deposit = req.body.deposit;

            const user = await this.usersService.findUserByEmail(email);
            if (user) {
                await this.accountService.deposit({user: user.id, deposit});
                return res.status(204).json({
                    success: true,
                    user_id: user.id
                });
            } else {
                throw new UserNotFoundError();
            }
        } catch (e) {
            sendError(res, e);
        }
    }

    @Post('create')
    @SuccessResponse("201", "Created")
    private async createItem(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("createItem request...", req.body);

            await this.itemService.create(req.body as ItemInput);
            return res.status(201).json({
                success: true,
            });
        } catch (e) {
            sendError(res, e);
        }
    }

    @Post('publish')
    @SuccessResponse("204", "Updated")
    private async publishItem(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("publishItem request...", req.body);
            await this.itemService.publishItem(req.body.name);
            return res.status(204).json({
                success: true,
            });
        } catch (e) {
            sendError(res, e);
        }
    }

    @Post('bid')
    @SuccessResponse("201", "Created")
    private async bid(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("bid request...", req.body);

            await this.biddingService.create(req.body as BiddingInput);
            return res.status(201).json({
                success: true,
            });
        } catch (e) {
            sendError(res, e);
        }
    }

    @Get('bids')
    @SuccessResponse("200", "Success")
    private async getAllBids(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("Get all bids request...", req.body);

            const bids = await this.biddingService.getAll(req.body.item_name);
            return res.status(200).json({
                bids
            });
        } catch (e) {
            sendError(res, e);
        }
    }
}