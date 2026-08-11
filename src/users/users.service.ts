import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll() : Promise<User[]> {
        return this.usersRepository.find();
    }

    findByEmail(email: string) : Promise<User | null> {
        return this.usersRepository.findOneBy({ email })
    }

    findOne(id: string) : Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async create(dto: CreateUserDto) : Promise<User>{
        const passwordHash = await bcrypt.hash(dto.password, 10);

       const user = this.usersRepository.create({
        ...dto,
        password: passwordHash
    });

       return this.usersRepository.save(user);
    }
}