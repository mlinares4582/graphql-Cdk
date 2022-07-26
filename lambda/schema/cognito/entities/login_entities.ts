require("reflect-metadata");
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class TokenResponse {
    @Field(type => String)
    accessToken: string;
    @Field(type => String)
    idToken: string;
    @Field(type => String)
    refreshToken: string;
}

@ObjectType()
export class CognitoResponse {
    @Field(type => String)
    code: string;
    @Field(type => String)
    message: string;
}

