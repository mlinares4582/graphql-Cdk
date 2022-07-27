require("reflect-metadata");
import { Resolver, Query, Arg, Authorized } from "type-graphql";
import { login } from "../login";
import { CognitoResponse, TokenResponse } from "../entities/login_entities";
import { logout } from "../logout";
import { LogoutResponse } from "../entities/logout_entities";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Resolver()
export class CognitoResolver {
//create login query for cognito
    @Authorized("admin")
    @Query(() => TokenResponse||CognitoResponse)
    async login(@Arg("username", type => String) username: string, @Arg("password",type => String) password: string): Promise<TokenResponse|CognitoResponse> {
       console.log("username: " + username);
        const result = await login(username, password);
        console.log("QUERY LOG"+ JSON.stringify(result));
        return result;
    }
    //create register query for cognito
    @Authorized()
    @Query(() => LogoutResponse)
    async logout (@Arg("username",type => String) username: string): Promise<LogoutResponse> {
        const result = await logout(username);
        console.log("QUERY LOG"+ JSON.stringify(result));
        return result;
    }
}


