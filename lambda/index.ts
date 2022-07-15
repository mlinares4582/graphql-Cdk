// import "reflect-metadata";
require("reflect-metadata");
const { buildSchema } = require('type-graphql');
// import { PingResolver } from "../resolvers/ping";

const {ApolloServer, gql} = require('apollo-server-lambda')
require('apollo-server-lambda')
const {typeDefs} =require("./schema/type-def")
const {resolvers} =require("./schema/resolvers")
const {PingResolver} =require("./schema/ping")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true,
})

const globalSchema = buildSchema({
    resolvers: [PingResolver]
});

async function getServer() {
    const schema = await globalSchema;
    return new ApolloServer({
        schema
    });
}

// exports.graphqlHandler = server.createHandler();
        
const apolloHandler = server.createHandler();

  exports.graphqlHandler = async function (event:any , context:any) {
    const server2 = await getServer();
    const apolloHandler2 =  server2.createHandler();

    try {
      return await apolloHandler2(event, context);
    } catch(error) {
      console.error(error);
    } 
    
  }



// exports.graphqlHandler = async function(event){
//     console.log("request",JSON.stringify(event,undefined,2));

  

//     return{
//       statusCode:200,
//       headers:{ "Content-Type": "text/plain"},
//       body: `Hello from Product! You've hit ${event.path}\n`
//     };    

// require("reflect-metadata");
// const { ApolloServer } = require('apollo-server-lambda');
// const { buildSchema } = require("type-graphql");
// const {PingResolver} =require("./schema/ping")


// const globalSchema = buildSchema({
//     resolvers: [PingResolver]
// });

// async function getServer() {
//     const schema = await globalSchema;
//     return new ApolloServer({
//         schema
//     });
// }

// export function graphqlHandler(event: any, ctx: any, callback: any) {
//     getServer()
//         .then(server => server.createHandler())
//         .then(handler => handler(event, ctx, callback))
// }