import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';


import * as bcrytjs from 'bcryptjs';
import { emitWarning } from 'process';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { profile } from 'console';

@Injectable()
export class AuthService {

    constructor( private readonly userService: UsersService,
        private readonly jwtService: JwtService ){}

    async register({name, email, password}: RegisterDto ){ 
        
        const user = await this.userService.findOneByEmail(email);
        
        if(user){
            throw new BadRequestException('User already exists');
        }
        return await this.userService.create({
            name, 
            email, 
            password: await bcrytjs.hash(password, 10),

        });
    }
    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException('email is wrong');
        }

        const isPasswordValid = await bcrytjs.compare(password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('password is wrong');
        }

        const payload = { email: user.email, role:user.role};
        const token = await this.jwtService.signAsync(payload)
        return {
            user,
            token,
        };
    }
    async profile ({email, rol}: {email: string, rol: string}){
        return await this.userService.findOneByEmail(email);
    }
}
