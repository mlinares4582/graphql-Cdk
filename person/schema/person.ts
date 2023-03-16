import { Resolver, Query, Mutation, Arg, Int, Float } from 'type-graphql'
const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient()

@Resolver()
export class PersonResolver {
    @Query(() => String)
    hello(
        @Arg("name", type => String) name: string
    ) {
        return "Hello, " + name
    }

    @Query(() => String)
    async getPersons() {
        const params = {
            TableName: "PersonTable",
        }

        const data = await dynamoDB.scan(params).promise()
        const results = JSON.stringify(data.Items)
        console.log(results)

        return results
    }


    @Mutation(() => String)
    async createPerson(
        @Arg("name", type => String) name: string,
        @Arg("age", type => Float) age: number
    ): Promise<string> {
        const params = {
            TableName: "PersonTable",
            Item: {
                name: name,
                age: age
            }
        }

        await dynamoDB.put(params).promise();
        return name + " added."
    }


}