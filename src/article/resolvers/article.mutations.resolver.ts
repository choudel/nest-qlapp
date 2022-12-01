import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { JWTPayLoad } from "src/auth/auth.service";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { ArticleService } from "../article.service";
import { ArticleCreateInput, ArticleCreateOutput } from "../dto/article-create.dto";
import { ArticleUpdateInput, ArticleUpdateOutput } from "../dto/article-update.dto";
import { ArticleDeleteOutput } from "../dto/article.delete.dto";
import { Article } from "../models/article.model";

@Resolver(Article)
export class ArticleMutationResolver {
    constructor(private readonly articleService: ArticleService) { }
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ArticleCreateOutput)
    async articleCreate(
        @CurrentUser() user:JWTPayLoad,
        @Args('input') input: ArticleCreateInput,
    ) {
        return this.articleService.articleCreate(user,input)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ArticleUpdateOutput)
    async articleUpdate(
        @Args({name:'articleId',type:()=>ID}) articleId:Article['id'],
        @Args('input') input: ArticleUpdateInput,
    ) {
        return this.articleService.articleUpdate(articleId,input)
    }
    @UseGuards(JwtAuthGuard)
    @Mutation(() => ArticleDeleteOutput)
    async articleDelete(
        @Args({name:'articleId',type:()=>ID}) articleId:Article['id'],
    ) {
        return this.articleService.articleDelete(articleId)
    }
} 