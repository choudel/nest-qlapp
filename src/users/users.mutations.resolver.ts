import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserCreateInput, UserCreateOutput } from "./dto/user-create.dto";
import { User } from "./models/users.model";
import { UsersService } from "./users.service";

@Resolver(User)
export class UserMutationsResolver{
    constructor(
        private readonly userService : UsersService,
    ){}
    @Mutation(()=>UserCreateOutput)
    async userCreate(@Args('input') input:UserCreateInput){
        return this.userService.userCreate(input)
    }
}