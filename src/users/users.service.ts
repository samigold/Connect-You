import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll() : Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string) : Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async create(dto: CreateUserDto) : Promise<User>{
       const user = this.usersRepository.create(dto);

       return this.usersRepository.save(user);
    }
}