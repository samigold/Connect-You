import { DataSource } from "typeorm";
import { User } from "./users/user.entity";
import { Task } from "./tasks/task.entity";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'konnect',
    password: 'konnectpass',
    database: 'konnect_db',
    entities: [User, Task],
    migrations: ['src/migrations/*.ts'],
})