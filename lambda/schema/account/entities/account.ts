require("reflect-metadata");
import { Field, ObjectType } from "type-graphql"
import { Balance } from "./balance"

@ObjectType()
export class Account {
    @Field(type => String)
    account_id: string
    @Field(type => Balance)
    balances: Balance
    @Field(type => String)
    mask: string
    @Field(type => String)
    name: string
    @Field(type => String)
    official_name: string
    @Field(type => String)
    type: string
    @Field(type => String)
    subtype: string
}
