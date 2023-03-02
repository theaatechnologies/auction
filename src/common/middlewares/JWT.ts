import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_KEY = process.env.JWT_SECRET || "auction";
import debug, { IDebugger } from "debug";

const log: IDebugger = debug("middleware:JWT");

class JWT {
  authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader !== "null") {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_KEY, (err: any, user: any) => {
        if (err) {
          log("Error", err);
          return res
              .status(403)
              .send({ success: false, message: "Token Expired" });
        }
        console.log('user is ', user);
        next();
      });
    } else {
      res.status(403).json({ success: false, message: "UnAuthorized" });
    }
  }
}

export default new JWT();