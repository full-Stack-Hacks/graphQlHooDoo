import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

// resolvers

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    // Auto get 3 args parent (parent in resolver chain), args (arguments), context
    review(_, args) {
      // get single review by id
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      // get single game by id
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      // get single game by id
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },

    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => {
        return game.id !== args.id;
      });
      return db.games;
    },
  },
};

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
