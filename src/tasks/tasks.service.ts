import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ){}

    create(dto: CreateTaskDto, userId: string) : Promise<Task>{
        

        const task = this.tasksRepository.create({
            ...dto,
            user  : {id : userId } as User
        });

        return this.tasksRepository.save(task);
    }
}
