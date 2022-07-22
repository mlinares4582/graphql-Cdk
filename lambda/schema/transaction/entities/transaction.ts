require("reflect-metadata");
import { Field, InputType, ObjectType } from "type-graphql"


@ObjectType()
export class Transaction {
    @Field(type => String)
    transaction_id: string;
    @Field(type => String)
    account_name: string;
    @Field(type => String)
    account_mask: string;
    @Field(type => String)
    amount: string;
    @Field(type => String)
    user_id: string;
    @Field(type => String)
    contact_name: string;
    @Field(type => String)
    contact_number: string;
    @Field(type => String)
    message: string;
    @Field(type => String)
    timeCreated: string;
}

@InputType()
export class NewTransactionInput {
    @Field(type => String)
    account_name: string;
    @Field(type => String)
    account_mask: string;
    @Field(type => String)
    amount: string;
    @Field(type => String)
    user_id: string;
    @Field(type => String)
    contact_name: string;
    @Field(type => String)
    contact_number: string;
    @Field(type => String)
    message: string;
}
