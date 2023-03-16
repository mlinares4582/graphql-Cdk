import "reflect-metadata";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway"
import {ApolloServer} from 'apollo-server-lambda';


async function getServer() {

    const gateway = new ApolloGateway({
      supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
          { name: 'item', url: 'https://2ihcnl2m3e.execute-api.us-east-1.amazonaws.com/prod/' },
        { name: 'person', url: 'https://6yyvnrgs2e.execute-api.us-east-1.amazonaws.com/prod/' },
        ],
      }),
    });
    console.log(gateway);
    return new ApolloServer({
        gateway,
    });
}

exports.graphqlHandler = async function (event:any , context:any) {
  console.log("Running server");
  const server = await getServer();
  console.log(server);
  const apolloHandler =  server.createHandler();
  console.log(apolloHandler);

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







