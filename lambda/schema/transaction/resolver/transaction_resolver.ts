import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { NewTransactionInput, Transaction } from "../entities/transaction";
import axios from "axios";

@Resolver()
export class TransactionResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Mutation(() => Transaction)
    async postTransaction(
        @Arg("newTransactionData", type => NewTransactionInput) newTransactionData: NewTransactionInput,
    ) {
        //TODO: Post Transaction to Dynamo
        //var query = `INSERT INTO transactions
        //           (user_id, account_name, account_mask,
        //            amount, contact_name, contact_number,
        //            message)
        //    VALUES ('${newTransaction.user_id}', '${newTransaction.account_name}', '${newTransaction.account_mask}',
        //            '${newTransaction.amount}', '${newTransaction.contact_name}', '${newTransaction.contact_number}',
        //            '${newTransaction.message}')
        //    RETURNING *;`;

        //const { rows } = await client.query(query);
        //var d = new Date(rows[0]['timestamp']);

        //Return New Transaction object
        return {
            transaction_id: null,
            user_id: null,
            account_name: null,
            account_mask: null,
            amount: null,
            contact_name: null,
            contact_number: null,
            message: null,
            timestamp: null,
        }

    }

    @Query(() => [Transaction])
    async getTransactions(
        @Arg("userId", type => String) userId: string,
    ): Promise<[Transaction]> {
        //TODO: Get Transactions from Dynamo by UserID
        //var query = `SELECT * FROM transactions
        //            WHERE user_id = '${userId}'
        //            ORDER BY "timestamp" DESC`;
        //const { rows } = await client.query(query);
        const transactions = [];
        return transactions;
    }
}
