import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Balance {
    @Field()
    available: number 
    @Field()
    current: number
    @Field()
    iso_currency_code: string
    @Field({ nullable: true })
    limit?: number
    @Field({ nullable: true })
    unofficial_currency_code?: string
}