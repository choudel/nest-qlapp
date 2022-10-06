import { Args, Query, Resolver } from "@nestjs/graphql";
import { ArticleService } from "../article.service";
import { ArticlesPagination, ArticlesPaginationArgs } from "../dto/articles-pagination.dto";
import { Article } from "../models/article.model";

@Resolver(Article)
export class ArticleQueriesResolver{
    constructor(
        private readonly articleService:ArticleService
    ){ }
    @Query(()=>ArticlesPagination)
    async articlePagination(@Args() args:ArticlesPaginationArgs){
        return this.articleService.articlesPagination(args)
    }
}