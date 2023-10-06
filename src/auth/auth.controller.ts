
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { register } from 'module';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';


interface RequestWithUser extends Request{
    user: {
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,

    ){
        return this.authService.register(registerDto);
    }

    @Post('Login')
    login(
        @Body()

        loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile( @Req() req: RequestWithUser){
        return this.authService.profile({
            email: req.user.email,
            rol: req.user.role,
        });  
    }
}
