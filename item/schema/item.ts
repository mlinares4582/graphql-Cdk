import { Resolver, Query, Mutation, Arg, Int, Float } from 'type-graphql'
const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient()

@Resolver()
export class ItemResolver {
    @Query(() => String)
    async getItems() {
        const params = {
            TableName: "ItemTable",
        }

        const data = await dynamoDB.scan(params).promise()
        const results = JSON.stringify(data.Items)
        console.log(results)

        return results
    }


    @Mutation(() => String)
    async createItem(
        @Arg("name", type => String) name: string,
        @Arg("count", type => Float) count: number
    ): Promise<string> {
        const params = {
            TableName: "ItemTable",
            Item: {
                name: name,
                count: count
            }
        }

        await dynamoDB.put(params).promise();
        return name + " added."
    }


}