import {NextFunction, Request, Response, Router} from "express";
import {UsersService} from "../../services/users-service";
import jwt from "jsonwebtoken";
import { Password } from "../../common/services/password";
import {injectable} from "inversify";
import {v4 as uuidv4} from 'uuid';
import {User} from "src/model/user";
import {sendError} from "src/utils/response";
import {UserNotFoundError} from "src/errors/user-not-found-error";
import {UserAlreadyExistError} from "src/errors/user-already-exist-error";
const jwtSecret: string = process.env.JWT_SECRET || "auction";
const tokenExpirationInSeconds = 36000;

@injectable()
export class AuthController {
    public readonly router: Router;
    private usersService: UsersService;

    constructor(usersService: UsersService) {
        this.router = Router();
        this.router.post("/login", this.login.bind(this));
        this.router.post("/register", this.register.bind(this));
        this.usersService = usersService;
    }

    private async login(req: any, res: Response, next: NextFunction): Promise<Record<any, any>> {
        try {
            console.log("login request...", req.body);
            const email = req.body.email;
            const password = req.body.password;

            const user = await this.usersService.findUserByEmail(email);
            if (user) {
                const isPasswordMatch = await Password.compare(user.password, password);

                if (!isPasswordMatch) {
                    throw new Error("Invalid Password");
                } else {
                    const token = jwt.sign(req.body, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    });

                    return res.status(200).json({
                        success: true,
                        data: user,
                        token,
                    });
                }
            } else {
                throw new UserNotFoundError();
            }
        } catch (e) {
            sendError(res, e);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            const user = await this.usersService.findUserByEmail(email);
            if (user) {
                throw new UserAlreadyExistError();
            } else {
                try {
                    const id = uuidv4();
                    const pass = await Password.toHash(password);
                    const user: User = {
                        username,
                        email,
                        password: pass
                    };
                    const newUser = await this.usersService.createUser({...user,id});
                    const token = jwt.sign({ username, password }, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    });

                    return res.status(201).json({
                        success: true,
                        data: newUser,
                        token,
                    });
                } catch (e) {
                    throw new Error("Error while register");
                }
            }
        } catch (e) {
            sendError(res, e);
        }
    }
}