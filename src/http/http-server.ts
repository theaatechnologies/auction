import express from "express";
import http from "http";
import {Config, PORT} from "src/config";
import { inject, injectable } from "inversify";
import swaggerUi from "swagger-ui-express";
import openapiDoc from "src/http/openapi.json";
import {AuthController} from "src/http/controllers/auth-controller";
import bodyParser from "body-parser";
import {UsersRepository} from "src/repositories/users-repository";
import {UsersService} from "src/services/users-service";
import {AccountRepository} from "src/repositories/account-repository";
import {AccountService} from "src/services/account-service";
import {AccountController} from "src/http/controllers/account-controller";
import {ItemRepository} from "src/repositories/item-repository";
import {ItemService} from "src/services/item-service";
import JWT from "src/common/middlewares/JWT";
import {BiddingRepository} from "src/repositories/bidding-repository";
import {BiddingService} from "src/services/bidding-service";
import {GuestController} from "src/http/controllers/guest-controller";

@injectable()
export class HttpServer {
  @inject(Config) private readonly config: Config = new Config();
  private authController: AuthController;
  private accountController: AccountController;
  private guestController: GuestController;

  private httpServer: http.Server;

  public start() {
    if (this.httpServer) return;

    const app = express();

    const usersRespository = new UsersRepository();
    const usersService = new UsersService(usersRespository);
    this.authController = new AuthController(usersService);

    const accountRespository = new AccountRepository();
    const accountService = new AccountService(accountRespository, usersRespository);
    const itemRespository = new ItemRepository();
    const itemService = new ItemService(itemRespository);

    const biddingRepository = new BiddingRepository();
    const biddingService = new BiddingService(biddingRepository, itemService);
    this.accountController = new AccountController(usersService, accountService, itemService, biddingService);
    this.guestController = new GuestController(biddingService);

    // parse application/json
    app.use(bodyParser.json());
    app.use('/docs', express.static(__dirname + '/swagger-ui'));
    app.use('/swagger.json', (req, res) => {
      res.sendFile(__dirname + '/swagger.json');
    });

    this.initRoutes(app);

    this.httpServer = app.listen(PORT);
    console.log(
      {
        port: PORT,
      },
      "Auction service started successfully..."
    );
  }

  public async shutdown() {
    if (!this.httpServer) return;
    await new Promise<void>((resolve) =>
      this.httpServer.close(() => {
        console.log("Auction service shutdown");
        resolve();
      })
    );
  }

  private initRoutes(app: express.Application) {
    app.use("/user", this.authController.router);
    app.use("/account", [JWT.authenticateJWT, this.accountController.router])
    app.use("/guest", [this.guestController.router]);
    app.use("/", swaggerUi.serve, swaggerUi.setup(openapiDoc));
  }
}
