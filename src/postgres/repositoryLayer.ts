import { randomUUID } from "crypto";
import { Task } from "./entity"
import { getDataSource } from "./init"


export const createSingleTask = async(taskType: string, taskDate: string)=> {
  let datasource = getDataSource();
  const taskRepository = datasource.getRepository(Task);
  const task = await taskRepository.create({
      // id: randomUUID(),
      task_type: taskType,
      task_date: taskDate
  }).save()
  return task
}

export const updateSingleTask = async(taskType: string, taskDate: string, id: string)=> {
  let datasource = getDataSource();
  const taskRepository = datasource.getRepository(Task);
  const task = await taskRepository.update({id}, {task_type: taskType, task_date: taskDate})
  return task
}

export const getAllTask = async(pageNo: number, limit: number)=>{
  let datasource = getDataSource();
  const taskRepository = datasource.getRepository(Task);
  const task = await taskRepository.createQueryBuilder("ta")
  .select([
      'id',
      'task_type',
      'task_date'
      ])
      .limit(limit)
      .offset(pageNo)
  .getRawMany();
  return task
}

export const getTaskMetric = async() =>{
  let datasource = getDataSource();
  const taskRepository = datasource.getRepository(Task);
  const task = await taskRepository.createQueryBuilder("ta")
  .select(['task_type', 'count(*) as count'])
  .groupBy('task_type')
  .getRawMany();
  return task
}

export const getTaskMetricForDate = async(taskDate: string) =>{
  let datasource = getDataSource();
  const taskRepository = datasource.getRepository(Task);
  const task = await taskRepository.createQueryBuilder("ta")
  .select(['task_type', 'count(*) as count'])
  .groupBy('task_type')
  .where("ta.task_date=:taskDate", {taskDate})
  .getRawMany();
  return task
}