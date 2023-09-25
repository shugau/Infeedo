import { DataSource, DataSourceOptions } from "typeorm";
import { Task } from "./entity";

let dataSource:DataSource;
export const init = async () => {
    dataSource = new DataSource({
        entities:[Task],
        type:'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: false,
        extra: {
        connectionLimit: 5
        }
    });
    await dataSource.initialize();
    // console.log("Success",dataSource)
  };

  export function getDataSource() {
    return dataSource;
  }