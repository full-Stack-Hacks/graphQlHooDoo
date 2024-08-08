import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";

// server setup
const server = new ApolloServer({
  //typedefs
  // typedefs are definition are the types I want to expose on my graph
  // author, name, age, books, ect...
  // type defs make up the schema
  typeDefs,
  //resolvers object - contains resolver functions. Tkane in a request and return
  // data to the client (think schema is a map - resolvers actual resolve shit)
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port", 4000);
