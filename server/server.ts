require('dotenv').config()
import typeDefs from "./schema/schema"
import resolvers from "./resolvers/resolvers"
import { ApolloServer } from 'apollo-server'

async function main() {
  let PORT = 5000
  const server = new ApolloServer({ typeDefs, resolvers });
  let url = await (await server.listen(PORT)).url
  console.log(`🚀 Apollo Server ready at ${url}`)
}

main()