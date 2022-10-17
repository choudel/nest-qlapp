import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async userCreate(input: UserCreateInput):Promise<UserCreateOutput>{
        const user= this.userRepository.create(input)
        await user.save()
        return {
            user
        }
        
    }
    async userGet(email:User['email']):Promise<User>{
        return await this.userRepository.findOneByOrFail({email})
    }
}
