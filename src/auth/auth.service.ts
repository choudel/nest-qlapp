import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/users.model';
import { UsersService } from 'src/users/users.service';
import { AuthLoginOutput } from './dto/auth-login.dto';

export interface JWTPayLoad{
    id:string;
    email:string;
    firstName:string;
    lastName:string;
}
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService:JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.userGet(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user:User):Promise<AuthLoginOutput>{
    const payload: JWTPayLoad={
        id:user.id,
        email:user.email,
        firstName:user.firstName,
        lastName:user.lastName
    }
    return {
        accessToken:this.jwtService.sign(payload)
    }
  }
}
