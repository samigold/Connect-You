import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User>{
        try {
            return this.usersService.create(createUserDto);
        } catch (error) {
            return error;
        }   
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

}