import "reflect-metadata";

import { ItemResolver } from "./schema/item";
import { buildSchema } from "type-graphql";
import { buildFederatedSchema } from "./helpers/buildFederatedSchema";
const { build } = require('type-graphql');
const {ApolloServer, gql} = require('apollo-server-lambda');
require('apollo-server-lambda');

const globalSchema = buildSchema({
    resolvers: [ItemResolver],
});

async function getServer() {
    // const schema = await globalSchema;
    const schema = await buildFederatedSchema(
      {
        resolvers: [ItemResolver],
        // orphanedTypes: [Item],
      },
      // {
      //   Item: { __resolveReference: resolveUserReference },
      // },
    );
    return new ApolloServer({
        schema
    });
}

  exports.graphqlHandler = async function (event:any , context:any) {
    const server = await getServer();
    const apolloHandler =  server.createHandler();

    try {
      return await apolloHandler(event, context);
    } catch(error) {
      console.error(error);
    } 
    
  }
































//   require("reflect-metadata");
// const { buildSchema } = require('type-graphql');
// const {ApolloServer, gql} = require('apollo-server-lambda');
// require('apollo-server-lambda');
// const {PingResolver} =require("./schema/ping");



// // const { unmarshall } = require("@aws-sdk/util-dynamodb");
// // const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

// // const client = new DynamoDBClient({ region: "us-east-1" });




// const globalSchema = buildSchema({
//     resolvers: [PingResolver]
// });

// async function getServer() {
//     const schema = await globalSchema;
//     return new ApolloServer({
//         schema
//     });
// }

//   exports.graphqlHandler = async function (event:any , context:any) {
//     const server = await getServer();
//     const apolloHandler =  server.createHandler();

//     try {
//       return await apolloHandler(event, context);
//     } catch(error) {
//       console.error(error);
//     } 
    
//   }






