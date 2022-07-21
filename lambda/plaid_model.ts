import { typeFromAST } from "graphql";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LinkTokenResponseModel {
    @Field(type => String)
    expiration: string
    @Field(type => String)
    link_token: string
    @Field(type => String)
    request_id: string
}

@ObjectType()
export class AccessTokenResponseModel {
    @Field(type => String)
    item_id: string
    @Field(type => String)
    access_token: string
    @Field(type => String)
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