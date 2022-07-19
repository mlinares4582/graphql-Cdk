import {Resolver,Query, Mutation , Arg, Int, Float} from 'type-graphql'
const AWS = require("aws-sdk");
// require("dotenv").config();



const dynamoDB = new AWS.DynamoDB.DocumentClient()

@Resolver()
export class NameResolver{
    @Query(() => String)
        helloName(
            @Arg("name", type => String) name: string
        ){
            return name
        } 




    @Query(()=>String)
    async getName(){
        const params = {
            TableName: "AthMovilDB",
        }

        const data = await dynamoDB.scan(params).promise()
        const results = JSON.stringify(data.Items)
        console.log(results)
        
        return results
    }


    @Mutation( () => String)
        async createUser( 
             @Arg("name", type => String) name: string,
        @Arg("amount", type => Float) amount: number
            ): Promise<string>{
            const params = {
                TableName: "AthMovilDB",
                Item: {
                    user_id: name,
                    amount:amount
                }
            }

           await dynamoDB.put(params).promise();
            return "User created was " 
        }


}