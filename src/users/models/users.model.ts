import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import {Node} from "src/article/pagination/models/node.model"

@Entity()
@ObjectType()
export class User extends Node {
    @Field(()=>String)
    @Column({unique:true})
    email:string
    
    @Column()
    password:string
    @Field(()=>String)
    @Column()
    firstName:string
    @Field(()=>String)
    @Column()
    lastName:string
    @Field(()=>String,{nullable:true})
    @Column({nullable:true})
    avatar?:string
}