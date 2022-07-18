import {Resolver,Query, Mutation , Arg} from 'type-graphql'
const AWS = require("aws-sdk");
// require("dotenv").config();



const dynamoDB = new AWS.DynamoDB.DocumentClient()

@Resolver()
export class NameResolver{
    @Query(() => String)
        helloName(){
            return "Hello World"
        }




    @Query(()=>String)
    async getName(){
        const params = {
            TableName: "AthMovilDB",
        }

        const data = await dynamoDB.scan(params).promise()
        const d = JSON.stringify(data.Items)
        console.log(d)
        
        return d
    }


    // @Mutation( ()=> String)
    //     createUser(@Arg("name") name:string){
    //         const params = {
    //             TableName: "AthMovilDB",
    //             Item: {
    //                 name: name
    //             }
    //         }

    //         dynamoDB.put(params).promise()
    //         return "User created was " + name
    //     }


}