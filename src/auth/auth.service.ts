import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor (private usersService : UsersService, private jwtService : JwtService){};


    async validateUser(email: string, password: string) : Promise<User>{
       const user  = await this.usersService.findByEmail(email);

       if(!user){
        throw new UnauthorizedException("Invalid Details");
       }

       const match = await bcrypt.compare(password, user.password);

       if(!match){
        throw new UnauthorizedException("Email or Password Incorrect");
       }

       return user;

    }

    async login(email: string, password: string) : Promise<{access_token: string}>{
        const user = await this.validateUser(email, password);


        const payload = { sub: user.id, email: user.email};

    
        return {
             access_token: await this.jwtService.sign(payload),
        }
    }
}
