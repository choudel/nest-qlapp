import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateInput, ArticleCreateOutput } from './dto/article-create.dto';
import { ArticleUpdateInput, ArticleUpdateOutput } from './dto/article-update.dto';
import { ArticleDeleteOutput } from './dto/article.delete.dto';
import { ArticlesPagination, ArticlesPaginationArgs } from './dto/articles-pagination.dto';
import { Article } from './models/article.model';
import { PaginationArgs, SortDirection } from './pagination/dto/pagination.dto';
import { JWTPayLoad } from "src/auth/auth.service";
import { User } from 'src/users/models/users.model';
import { Comment } from 'src/comment/models/comment.model';
import { ArticleCommentsPagination } from './dto/article-comments-pagination.dto';


@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }
    async articleCreate(user: JWTPayLoad, input: ArticleCreateInput): Promise<ArticleCreateOutput> {

        const article = this.articleRepository.create(input);
        article.author = new User();
        article.author.id = user.id;
        await article.save()
        return { article }
    }
    async articleUpdate(
        articleId = Article['id'],
        input: ArticleUpdateInput,
    ): Promise<ArticleUpdateOutput> {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .where("article.id = :id", { id: articleId })
            .getOne();
        article.title = input.title;
        article.description = input.description;
        article.image = input.image;
        await article.save()
        return { article }
    }
    async articleDelete(
        articleId = Article['id'],
    ): Promise<ArticleDeleteOutput> {
        const article = await this.articleRepository
            .createQueryBuilder("article")
            .where("article.id = :id", { id: articleId })
            .getOne();
        await article.remove()
        return { articleId }
    }
    async articleGetById(articleId: Article['id']): Promise<Article> {
        return this.articleRepository
            .createQueryBuilder("article")
            .where("article.id = :id", { id: articleId })
            .getOne();
    }

    async articlesPagination(args: ArticlesPaginationArgs): Promise<ArticlesPagination> {
        const qb = this.articleRepository.createQueryBuilder('article');
        qb.take(args.take);
        qb.skip(args.skip);
        if (args.sortBy) {
            if (args.sortBy.createdAt !== null) {
                qb.addOrderBy('article.createdAt', args.sortBy.createdAt === SortDirection.ASC ? 'ASC' : 'DESC')
            }
            if (args.sortBy.title !== null) {
                qb.addOrderBy('article.title', args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC')
            }
        }
        const [nodes, totalCount] = await qb.getManyAndCount();
        return { nodes, totalCount };
    }
    async articleCommentsPagination(
        articleId: Article['id'],
        args: PaginationArgs,
    ): Promise<ArticleCommentsPagination> {
        const [nodes, totalCount] = await this.commentRepository.findAndCount({
            skip: args.skip,
            take: args.take,
            where: {
                article: {
                    id: articleId,
                },
            },
            order: {
                createdAt:
                    args.sortBy?.createdAt === SortDirection.ASC ? 'ASC' : 'DESC',
            },
        });
        return {
            nodes,
            totalCount,
        };
    }
}
