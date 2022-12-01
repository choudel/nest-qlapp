import {Args, Parent, ResolveField, Resolver} from "@nestjs/graphql";
import { User } from "src/users/models/users.model";
import { UsersService } from "src/users/users.service";
import { Article} from "../models/article.model";
import { PaginationArgs } from "../pagination/dto/pagination.dto";
import { ArticleCommentsPagination } from "../dto/article-comments-pagination.dto";
import { ArticleService } from "../article.service";

@Resolver(Article)
export class ArticleFieldsResolver{
    constructor(
        private userService: UsersService,
        private articleService: ArticleService
        ){}
    @ResolveField(()=>User,{nullable:true})
    async author (@Parent() article: Article){
        if (!article.authorId){
            return null;
        }
        try{
            return await this.userService.userGetById(article.authorId);
        }catch(e){
            return null;
        }
    }
    @ResolveField(() => ArticleCommentsPagination)
  async comments(@Parent() article: Article, @Args() args: PaginationArgs) {
    return await this.articleService.articleCommentsPagination(
      article.id,
      args,
    );
  }
}