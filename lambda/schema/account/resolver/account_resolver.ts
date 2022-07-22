require("reflect-metadata");
import { Resolver, Query, Arg } from "type-graphql";
import { Account } from "../entities/account";
import axios from "axios";
import { PlaidConstants } from "../../../constants/plaid-constans";
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Resolver()
export class AccountResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Query(returns => [Account])
    async getAccounts(
        @Arg("user_id", type => String) userId: string,
    ): Promise<[Account]> {
        // Get Access Token from Dynamo by User ID
        const accessToken = await this.getAccessTokenFromDB(userId);

        //Get Accounts with Plaid API and Access Token
        return await this.plaidApi.post('/accounts/balance/get', {
            client_id: PlaidConstants.PLAIDCLIENT,
            secret: PlaidConstants.PLAIDSECRET,
            access_token: accessToken
        }).then(res => {
            return res.data['accounts'];
        }).catch(error => {
            return error.response.data;
        });
    }

    async getAccessTokenFromDB(
        user_id: string,) {

        const token = await dynamoDB.get({
            TableName: "AthMovilTable",
            Key: {
                user_Id: user_id
            }
        }).promise();
        
            // console.log(token)
            if (token.Item == undefined) {
            return "";
            }
            // console.log(token.Item)
            return token.Item.access_token
    }
}


