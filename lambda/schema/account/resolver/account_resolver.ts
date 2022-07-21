require("reflect-metadata");
import { Resolver, Query, Arg } from "type-graphql";
import { Account } from "../entities/account";
import axios from "axios";
import { PlaidConstants } from "../../../constants/plaid-constans";

@Resolver()
export class AccountResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Query(returns => [Account])
    async getAccounts(
        @Arg("request_id", type => String) requestId: string,
    ): Promise<[Account]> {
        // Get Access Token from Dynamo by User ID
        const accessToken = null;

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

}
