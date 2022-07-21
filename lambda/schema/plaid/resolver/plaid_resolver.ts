require("reflect-metadata");
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";
import { AccessTokenResponseModel, LinkTokenResponseModel } from "../entities/plaid_model";
import { PlaidConstants } from "../../../constants/plaid-constans";
import { resolve } from "dns";
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Resolver()
export class PlaidResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Query(returns => LinkTokenResponseModel)
    async getLinkToken() {

        return await this.plaidApi.post('/link/token/create', {
            client_id: PlaidConstants.PLAIDCLIENT,
            secret: PlaidConstants.PLAIDSECRET,
            client_name: PlaidConstants.PLAIDCLIENTNAME,
            country_codes: ["US"],
            language: "en",
            user: {
                client_user_id: PlaidConstants.PLAIDCLIENTUSERID,
            },
            products: ["auth"]
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error.response.data)
            return error.response.data;
        });

    }

    @Mutation(returns => AccessTokenResponseModel)
    async getAccessTokenFromPlaid(
        @Arg("user_id", type => String) user_id: string,
        @Arg("public_token", type => String) public_token: string
        ) {
        
        return await this.plaidApi.post('/item/public_token/exchange', {
            client_id: PlaidConstants.PLAIDCLIENT,
            secret: PlaidConstants.PLAIDSECRET,
            public_token: public_token,
        }).then(async res =>  {

            const params = {
                TableName: "AthMovilTable",
                Item: {
                    user_Id: user_id,
                    access_token: res.data["access_token"],
                 }
            }
            var prom = await dynamoDB.put(params).promise()
            console.log(prom)
            return {
                access_token: res.data["access_token"],
                request_id: res.data["request_id"],
                item_id: res.data["item_id"]
            };
        }).catch(error => {
            console.log(error.response.data)
            return error.response.data;
        });
    }

    @Query(returns => String)
    async getAccessTokenFromDB(
        @Arg("user_id", type => String) user_id: string,) {
        console.log("Running get access token from db" + user_id)

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


async deleteAccessTokenFromPlaid(
        access_token: string
        ) {
        
        return await this.plaidApi.post('/item/remove', {
            client_id: PlaidConstants.PLAIDCLIENT,
            secret: PlaidConstants.PLAIDSECRET,
            access_token: access_token,
        }).then(async res => {
            return true;
        }).catch(error => {
            if (error.response.status == 400) {
            return false;
            }
            throw error;
        });
    }



    async deleteAccessTokenFromDB(user_id: string) {
            const params = {
                TableName: "AthMovilTable",
                Key: {
                    user_Id: user_id
                }
            }
            var result = await dynamoDB.delete(params).promise()
            if(result == undefined) {
            console.log("resultitem undefined" + result)
                return false;
            }
            console.log(result)
            return true;
        }
    




    @Mutation(returns => Boolean)
    async deleteUserToken(
        @Arg("user_id", type => String) user_id: string,) {

        //get access token from DB
        const accessToken = await this.getAccessTokenFromDB(user_id);

        //delete access token in plaid
        var plaidRes = await this.deleteAccessTokenFromPlaid(accessToken)

        if (plaidRes) {//delete from plaid succesful
            //delete access token from DB
            var dbRes = await this.deleteAccessTokenFromDB(user_id)
            return dbRes;
        }
        return plaidRes;//delete from plaid failed OR token not found in DB
    }

}
