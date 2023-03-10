import "reflect-metadata";

import { HttpServer } from "src/http/http-server";
import connect from "src/db-connect";
const httpServer = new HttpServer();

async function start() {
  await connect();
  await httpServer.start();
}

start();

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received");
  await httpServer.shutdown();
});

process.on("unhandledRejection", (reason: any) => {
  console.log(reason, "unhandledRejection");
});

process.on("uncaughtException", (err: Error) => {
  console.log(err, "uncaughtException");
});
