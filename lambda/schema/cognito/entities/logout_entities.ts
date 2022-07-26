require("reflect-metadata");
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class LogoutResponse {
    @Field(type => String)
    msg: string;
}
