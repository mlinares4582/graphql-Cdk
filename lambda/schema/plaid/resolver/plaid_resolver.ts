import { Resolver, Query, Arg, Mutation } from "type-graphql";
import axios from "axios";

@Resolver()
export class PlaidResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Query(returns => LinkTokenResponseModel)
    async getLinkToken() {

        return await this.plaidApi.post('/link/token/create', {
            client_id: ServerConfig.PLAIDCLIENT,
            secret: ServerConfig.PLAIDSECRET,
            client_name: ServerConfig.PLAIDCLIENTNAME,
            country_codes: ["US"],
            language: "en",
            user: {
                client_user_id: ServerConfig.PLAIDCLIENTUSERID,
            },
            products: ["auth"]
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error.response.data)
            return error.response.data;
        });

    }

    @Query(returns => AccessTokenResponseModel)
    async getAccessToken(
        @Arg("public_token") public_token: string,
        @Arg("request_id") request_id: string,) {
        const res = await this.getAccessTokenUsecase.execute(public_token);
        if (res.access_token == null) {
            console.log(res)
            throw new Error("Error generating access token");
        }
        await this.postUserTokenUsecase.execute(request_id, res.access_token);
        return res;
    }

    @Query(returns => String)
    async getUserToken(
        @Arg("user_id") user_id: string,) {
        return await this.getUserTokenUsecase.execute(user_id);
    }

    @Mutation(returns => String)
    async deleteUserToken(
        @Arg("user_id") user_id: string,) {

        //get access token from DB
        const accessToken = await this.getUserTokenUsecase.execute(user_id)

        //delete access token in plaid
        var plaidRes = await this.deleteAccessTokenFromPlaidUsecase.execute(accessToken)

        if (plaidRes) {//delete from plaid succesful
            //delete access token from DB
            var dbRes = await this.deleteAccessTokenFromDBUsecase.execute(user_id)
            return dbRes;
        }
        return plaidRes;//delete from plaid failed OR token not found in DB
    }

}
