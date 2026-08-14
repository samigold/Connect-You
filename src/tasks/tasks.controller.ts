import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor (private readonly tasksService: TasksService){}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Req() request: Request, @Body() dto: CreateTaskDto) : Promise<Task>{
            return this.tasksService.create(dto, request['user'].sub)
    }

}
