require("reflect-metadata");
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Balance {
    @Field(type => Number,)
    available: number 
    @Field(type => Number,)
    current: number
    @Field(type => String)
    iso_currency_code: string
    @Field(type => Number, { nullable: true })
    limit?: number
    @Field(type => String,{ nullable: true })
    unofficial_currency_code?: string
}