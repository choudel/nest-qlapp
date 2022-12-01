import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { UsersModule } from 'src/users/users.module';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { CommentMutationResolver } from './resolvers/comment.mutations.resolver';

@Module({
  imports:[
    TypeOrmModule.forFeature([Comment]),
    UsersModule,
    ArticleModule
  ],
  providers: [CommentService,CommentMutationResolver]
})
export class CommentModule {}
