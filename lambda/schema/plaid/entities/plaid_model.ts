import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LinkTokenResponseModel {
    @Field()
    expiration: string
    @Field()
    link_token: string
    @Field()
    request_id: string
}

@ObjectType()
export class AccessTokenResponseModel {
    @Field()
    item_id: string
    @Field()
    access_token: string
    @Field()
    request_id: string
}

export interface PlaidRequest {
    client_id: string;
    secret: string;
    client_name: string;
    country_codes: string[],
    language: string,
    user: string,
    products: string[]
}