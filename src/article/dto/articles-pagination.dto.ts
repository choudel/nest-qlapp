import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { title } from "process";
import { Article } from "../models/article.model";
import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "../pagination/dto/pagination.dto";

@InputType()
export class ArticlesPaginationSortBy extends PaginationSortBy{
    @Field(()=>SortDirection,{nullable:true})
    title?:SortDirection
}

@ArgsType()
export class ArticlesPaginationArgs extends PaginationArgs{
    @Field(()=>ArticlesPaginationSortBy,{nullable:true})
    sortBy?:ArticlesPaginationSortBy
}

@ObjectType()
export class ArticlesPagination extends Pagination{
    @Field(()=>[Article])
    nodes:Article[]
}