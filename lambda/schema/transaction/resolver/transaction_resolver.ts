require("reflect-metadata");
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { NewTransactionInput, Transaction } from "../entities/transaction";
import axios from "axios";
const { v4 } = require('uuid');
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();


@Resolver()
export class TransactionResolver {

    plaidApi = axios.create({
        baseURL: 'https://sandbox.plaid.com'
    })

    @Mutation(() => Transaction)
    async postTransaction(
        @Arg("newTransactionData", type => NewTransactionInput) newTransactionData: NewTransactionInput,
    ) {
        const uniqueId = v4();
        const createdAt = new Date().toLocaleString('en-US', { timeZone: 'America/La_Paz' });
        const params = {
            TableName: "AthMovil_TransactionTable",
            Key: {
                user_id: newTransactionData.user_id,
            },
            sortKey: createdAt,
            Item: {
                transaction_id: uniqueId,
                user_id: newTransactionData.user_id,    
                account_name: newTransactionData.account_name,
                account_mask: newTransactionData.account_mask,
                amount: "$"+newTransactionData.amount,
                contact_name: newTransactionData.contact_name,
                contact_number: newTransactionData.contact_number,
                message: newTransactionData.message,
                timeCreated: createdAt,
            },
        }
        const result = await dynamoDB.put(params).promise();
        console.log(result)
        
        const newTransaction = await this.getTransaction(newTransactionData.user_id, createdAt);
        //Return New Transaction object
        console.log("new trasnsaction "+newTransaction);
        return {
            transaction_id: newTransaction.transaction_id,
            user_id: newTransaction.user_id, 
            account_name: newTransaction.account_name,
            account_mask: newTransaction.account_mask,
            amount: newTransaction.amount,
            contact_name: newTransaction.contact_name,
            contact_number: newTransaction.contact_number,
            message: newTransaction.message,
            timeCreated: newTransaction.timeCreated,
            }
    }

    async getTransaction( user_Id: string, timeCreated: string): Promise<Transaction> {
        const result = await dynamoDB.get({
            TableName: "AthMovil_TransactionTable",
            // get transaction id for a user and time created
            Key: {
                user_id: user_Id,
                timeCreated: timeCreated,
                
            },
        }).promise();
            console.log(result)
            return result.Item;
    }

    @Query(() => [Transaction])
    async getTransactions(
        @Arg("userId", type => String) userId: string,
    ): Promise<Transaction[]> {
        // get all transactions for a user
        const result = await dynamoDB.query({
            TableName: "AthMovil_TransactionTable",
            KeyConditionExpression: "user_id = :user_id ",
            ExpressionAttributeValues: {
                ":user_id": userId,
            },
        }).promise();
        console.log(result.Item)
        const transactions = result.Items.map((item:any) => {
            return {
                transaction_id: item.transaction_id,
                user_id: item.user_id,
                account_name: item.account_name,
                account_mask: item.account_mask,
                amount: item.amount,
                contact_name: item.contact_name,
                contact_number: item.contact_number,
                message: item.message,
                timeCreated: item.timeCreated,
                };
        }
        );

        return transactions;
    }
  
}