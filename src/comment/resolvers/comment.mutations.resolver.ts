import { UseGuards } from "@nestjs/common";
import {Args, Mutation, Resolver} from "@nestjs/graphql";
import { JWTPayLoad } from "src/auth/auth.service";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { CommentService } from "../comment.service";
import { CommentCreateInput, CommentCreateOutput } from "../dto/comment-create.dto";
import {Comment} from "../models/comment.model";

@Resolver(Comment)
export class CommentMutationResolver{
    constructor(private readonly commentService: CommentService){}
    @UseGuards(JwtAuthGuard)
    @Mutation(()=> CommentCreateOutput)
    async commentCreate(
        @CurrentUser() user:JWTPayLoad,
        @Args('input') input: CommentCreateInput
    ){
        return this.commentService.commentCreate(user,input);
    }
}