import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';


@Module({
  imports:  [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "nestqlapp",
        entities: ["dist/**/*.model{.ts,.js}"],
        synchronize: true,
      }),}),ArticleModule, AuthModule, UsersModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
