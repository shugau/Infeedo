import { Router } from "express";
import { TaskController } from "./controllers/task";

export class ExpressRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  routes() {
    this.router.use("/task", new TaskRoute().router);
  }
}


export class TaskRoute {
    router: Router;
    public taskController = new TaskController();
  
    constructor() {
      this.router = Router();
      this.routes();
    }
    routes() {
      this.router.post(
        "/",
        this.taskController.createTask
      );
      this.router.get(
        "/",
        this.taskController.getTasks
      );
      this.router.put(
        "/",
        this.taskController.updateTask
      );
      this.router.get(
        "/metrics",
        this.taskController.getMetrics
      );
    }
  }