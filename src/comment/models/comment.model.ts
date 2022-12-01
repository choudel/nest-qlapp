import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/models/article.model";
import { User } from "src/users/models/users.model";
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { Node } from "src/article/pagination/models/node.model";
@Entity()
@ObjectType()
export class Comment extends Node{
    @ManyToOne(()=>User,(user)=>user.comments)
    @JoinColumn()
    author: User;

    @RelationId((self:Comment)=>self.author)
    readonly authorId: User['id'];

    @ManyToOne(() => Article, (article) => article.comments)
    @JoinColumn()
    article: Article;
  
    @RelationId((self: Comment) => self.article)
    readonly articleId: User['id'];
    @Column()
    @Field()
    message:string;
    
}