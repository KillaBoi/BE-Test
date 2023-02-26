import { gql } from 'apollo-server-express'; 
// im using an old version which is apollo-server-express, but we should use apollo-server instead

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    balance: Float!
  }

  type Bet {
    id: Int!
    user: User!
    betAmount: Float!
    chance: Float!
    payout: Float!
    win: Boolean!
  }

  type Query {
    getUser(id: Int!): User
    getUserList: [User!]!
    getBet(id: Int!): Bet
    getBetList: [Bet!]!
    getBestBetPerUser(limit: Int!): [Bet!]!
  }

  type Mutation {
    createBet(userId: Int!, betAmount: Float!, chance: Float!): Bet!
  }
`;

export default typeDefs;