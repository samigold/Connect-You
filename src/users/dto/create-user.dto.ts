import { IsEmail, IsNotEmpty, IsString, isString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail() 
  @IsString()
  email: string;

  @IsNotEmpty() 
  @MinLength(8) 
  @IsString()
  password: string;


}
