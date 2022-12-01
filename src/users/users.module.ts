import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users.model';
import { UserMutationsResolver } from './users.mutations.resolver';
import { UsersService } from './users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])],
  providers: [UsersService,UserMutationsResolver],
  exports:[UsersService],

})
export class UsersModule {}
