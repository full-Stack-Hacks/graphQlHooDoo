export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        game(id: ID!): Game
        author(id: ID!): Author
        games: [Game]
        authors: [Author]
    }
    type Mutation {
        deleteGame(id: ID!): [Game]
    }
`;

// types: int, float, string, boolean, ID
