import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/users/users.module';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleFieldsResolver } from './resolvers/article.fields.resolver';
import { ArticleMutationResolver } from './resolvers/article.mutations.resolver';
import { ArticleQueriesResolver } from './resolvers/article.queries.resolver';
import { Comment } from 'src/comment/models/comment.model';


@Module({
  imports: [TypeOrmModule.forFeature([Article,Comment]),UsersModule],
  providers: [
    ArticleService,
    ArticleMutationResolver,
    ArticleQueriesResolver, 
    ArticleFieldsResolver
  ],
  exports:[ArticleService]
})
export class ArticleModule {}
