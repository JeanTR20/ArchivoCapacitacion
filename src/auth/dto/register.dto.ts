import { Controller } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength, minLength } from 'class-validator';
export class RegisterDto{
    @IsString()
    @MinLength(1)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}