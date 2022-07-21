import {Resolver,Query, Mutation , Arg, Int, Float} from 'type-graphql'
import axios from 'axios';
import { AccessTokenResponseModel, LinkTokenResponseModel } from '../plaid_model';
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Resolver()
export class PlaidResolver{
    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })
    @Query(()=>LinkTokenResponseModel)
    async getLinkTokenQuery(){
        console.log("Runnign link token query");
        return await this.plaidApi.post('/item/remove', {
            client_id: "62bc6ee7f817ee0014aa81af",
            secret: "70bade7ce0af73f12c5284aa022456",
            access_token: "Mock Banking App",
            country_codes: ["US"],
            language: "en",
            user: {
                client_user_id: "banking_app_id",
            },
            products: ["auth"]
        }).then(res => {
            console.log(res.data);
            return res.data;
        }).catch(error => {
            console.log(error.response.data)
            return error.response.data;
        });
    }



    @Mutation(()=>AccessTokenResponseModel)
    async getAccessTokenQuery(
        @Arg("user_id", type => String) user_id: string,
        @Arg("public_token", type => String) public_token: string
    ){
        // return await this.plaidApi.post('/item/public_token/exchange', {
        //     client_id: "62bc6ee7f817ee0014aa81af",
        //     secret: "70bade7ce0af73f12c5284aa022456",
        //     public_token: public_token,
        // }).then(res => {
        //     return {
        //         access_token: res.data["access_token"],
        //         request_id: res.data["request_id"],
        //         item_id: res.data["item_id"]
        //     };
        // }).then(queryResult => async () => {

            const params = {
                TableName: "AthMovilTable",
                Item: {
                    user_id: "michaellinares",
                    access_token: "ashdiadkajsd1230ndka",
                }
            }
            var prom =  await dynamoDB.put(params).promise()

            console.log(prom)
            // console.log(queryResult)
            // return queryResult;
            return {
                        access_token: "asd",
                        request_id:"asd",
                        item_id: "asd",
                    };
        // }).catch(error => {
            // console.log(error.response.data)
            // return error.response.data;
        // });
    
    }


    // @Mutation( () => String)
    //     async createUser( 
    //          @Arg("name", type => String) name: string,
    //     @Arg("amount", type => Float) amount: number
    //         ): Promise<string>{
    //         const params = {
    //             TableName: "AthMovilDB",
    //             Item: {
    //                 user_id: name,
    //                 amount:amount
    //             }
    //         }

    //        await dynamoDB.put(params).promise();
    //         return "User created was " 
    //     }


}