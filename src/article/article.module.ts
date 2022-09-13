import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';
import { ArticleMutationResolver } from './resolvers/article.mutations.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Article])],
  providers: [ArticleService,ArticleMutationResolver]
})
export class ArticleModule {}
