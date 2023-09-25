import express, { Application } from 'express';
import dotenv from "dotenv";
import { ExpressRoutes } from './routes';
import { init } from './postgres/init';

dotenv.config({ path: ".env", debug: true });

process
  .on("unhandledRejection", (reason: any, promise: any) => {
    console.error(reason, "Unhandled Rejection at Promise", promise);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown", err);
  });

const PORT: number = 8080;
const appInit = async () =>{
    const app: Application = express();
    app.use(express.json());
    app.use(new ExpressRoutes().router);
    await init();    
    app.listen(PORT, (): void => {
        console.log('SERVER IS UP ON PORT:', PORT);
    });
}
appInit();

