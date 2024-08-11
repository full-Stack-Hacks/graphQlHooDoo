import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { games, authors, reviews } from "./_db.js";

// resolvers

const resolvers = {
  Query: {
    games() {
      return games;
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
  },
};

// this is just some test

// server setup
const server = new ApolloServer({
  //typedefs
  // typedefs are definition are the types I want to expose on my graph
  // author, name, age, books, ect...
  // type defs make up the schema
  typeDefs,
  //resolvers object - contains resolver functions. Tkane in a request and return
  // data to the client (think schema is a map - resolvers actual resolve shit)
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port", 4000);
