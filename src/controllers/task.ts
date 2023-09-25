import { Request, Response } from "express";
import { createSingleTask, getAllTask, getTaskMetric, getTaskMetricForDate, updateSingleTask } from "../postgres/repositoryLayer";

export class TaskController{
  getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const pageNo = req.body.pageNo ? (req.body.pageNo as number) : null;
      const limit = req.body.limit ? (req.body.limit as number) : null;
      if(pageNo && limit){
        const tasks = await getAllTask(pageNo, limit)
        res.status(200).json(tasks);
      }else{
        throw "Invalid request input"
      }
    } catch (err: any) {
      res.status(500).json({
        code: 404,
        success: false,
        message: `error is ${err}`,
      });
    }
  };


  createTask = async (req: Request, res: Response): Promise<void> => {
    try{
      const taskType = req.body.taskType ? (req.body.taskType as string) : null;
      const taskDate = req.body.taskDate ? (req.body.taskDate as string) : null;

      if(taskType && taskDate){
        const task = await createSingleTask(taskType, taskDate)
        res.status(200).json(task);
      } else{
        throw "Invalid request input"
      }
    } catch (err: any) {
      res.status(500).json({
        code: 404,
        success: false,
        message: `error is ${err}`,
      });
    }
  }

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try{
      const taskType = req.body.taskType ? (req.body.taskType as string) : null;
      const taskDate = req.body.taskDate ? (req.body.taskDate as string) : null;

      const id = req.body.id ? (req.body.id as string) : null;
      if(taskType && taskDate && id){
        const task = await updateSingleTask(taskType, taskDate, id)
        res.status(200).json(task);
      } else{
        throw "Invalid request input"
      }
    } catch (err: any) {
      res.status(500).json({
        code: 404,
        success: false,
        message: `error is ${err}`,
      });
    }
  }

  getMetrics = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskDate = req.body.taskDate ? (req.body.taskDate as string) : null;
      if(taskDate){
        const tasks = await getTaskMetricForDate(taskDate)
        res.status(200).json(tasks);
      }else{
        const tasks = await getTaskMetric()
        res.status(200).json(tasks);
      }
    } catch (err: any) {
      res.status(500).json({
        code: 404,
        success: false,
        message: `error is ${err}`,
      });
    }
  };
}