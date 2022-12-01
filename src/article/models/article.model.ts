import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/users.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Node } from "../pagination/models/node.model";
import { Comment } from "src/comment/models/comment.model";
@Entity()
@ObjectType()
export class Article extends Node{
    @Field(()=>String)
    @Column()
    title:string
    @Field(()=>String)
    @Column()
    description:string
    @Field(()=>String)
    @Column()
    image:string
    @ManyToOne(()=>User,(user)=>user.articles)
    @JoinColumn()
    author:User

    @RelationId((self: Article)=>self.author)
    readonly authorId:User['id'];
    
    @OneToMany(()=>Comment,(comment)=>comment.article)
    @JoinColumn()
    comments: Comment;
    
}