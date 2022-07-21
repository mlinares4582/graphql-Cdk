import { Field, ObjectType } from "type-graphql"
import { Balance } from "./balance"

@ObjectType()
export class Account {
    @Field()
    account_id: string
    @Field()
    balances: Balance
    @Field()
    mask: string
    @Field()
    name: string
    @Field()
    official_name: string
    @Field()
    type: string
    @Field()
    subtype: string
}
