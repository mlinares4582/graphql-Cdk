require("reflect-metadata");
const { buildSchema } = require('type-graphql');

const {ApolloServer, gql} = require('apollo-server-lambda')
require('apollo-server-lambda')

const {PingResolver} =require("./schema/ping")


const globalSchema = buildSchema({
    resolvers: [PingResolver]
});

async function getServer() {
    const schema = await globalSchema;
    return new ApolloServer({
        schema
    });
}



  exports.graphqlHandler = async function (event:any , context:any) {
    const server = await getServer();
    const apolloHandler2 =  server.createHandler();

    try {
      return await apolloHandler2(event, context);
    } catch(error) {
      console.error(error);
    } 
    
  }



