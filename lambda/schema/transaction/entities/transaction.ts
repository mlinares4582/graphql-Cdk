import { Field, InputType, ObjectType } from "type-graphql"


@ObjectType()
export class Transaction {
    @Field()
    transaction_id: string;
    @Field()
    account_name: string;
    @Field()
    account_mask: string;
    @Field()
    amount: string;
    @Field()
    user_id: string;
    @Field()
    contact_name: string;
    @Field()
    contact_number: string;
    @Field()
    message: string;
    @Field()
    timestamp: string;
}

@InputType()
export class NewTransactionInput {
    @Field()
    account_name: string;
    @Field()
    account_mask: string;
    @Field()
    amount: string;
    @Field()
    user_id: string;
    @Field()
    contact_name: string;
    @Field()
    contact_number: string;
    @Field()
    message: string;
}
