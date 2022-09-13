import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { ArticleService } from "../article.service";
import { ArticleCreateInput, ArticleCreateOutput } from "../dto/article-create.dto";
import { ArticleUpdateInput, ArticleUpdateOutput } from "../dto/article-update.dto";
import { Article } from "../models/article.model";

@Resolver(Article)
export class ArticleMutationResolver {
    constructor(private readonly articleService: ArticleService) { }

    @Mutation(() => ArticleCreateOutput)
    async articleCreate(
        @Args('input') input: ArticleCreateInput,
    ) {
        return this.articleService.articleCreate(input)
    }
    @Mutation(() => ArticleUpdateOutput)
    async articleUpdate(
        @Args({name:'articleId',type:()=>ID}) articleId:Article['id'],
        @Args('input') input: ArticleUpdateInput,
    ) {
        return this.articleService.articleUpdate(articleId,input)
    }
}