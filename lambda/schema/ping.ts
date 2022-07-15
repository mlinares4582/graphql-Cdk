const {Query, Resolver} = require('type-graphql');

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping() {
    return "Pong!"
  }
}

