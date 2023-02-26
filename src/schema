import { ApolloServer, gql } from 'apollo-server';
import { Sequelize } from 'sequelize';
import { Bet, initBetModel } from './models/bet';
import { User, initUserModel } from './models/user';

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './db.sqlite',
});

initUserModel(sequelize);
initBetModel(sequelize);

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    balance: Float!
  }

  type Bet {
    id: Int!
    userId: Int!
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

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findByPk(id);
    },
    getUserList: async () => {
      return await User.findAll();
    },
    getBet: async (_, { id }) => {
      return await Bet.findByPk(id);
    },
    getBetList: async () => {
      return await Bet.findAll();
    },
    getBestBetPerUser: async (_, { limit }) => {
      const results = await sequelize.query(
        `
        SELECT DISTINCT ON ("userId") *
        FROM "Bets"
        ORDER BY "userId", "payout" DESC
        LIMIT :limit
      `,
        {
          model: Bet,
          mapToModel: true,
          replacements: { limit },
        }
      );

      return results;
    },
  },
  Mutation: {
    createBet: async (_, { userId, betAmount, chance }) => {
      return await Bet.createBet(userId, betAmount, chance);
    },
  },
  User: {
    id: (user) => user.id,
    name: (user) => user.name,
    balance: (user) => user.balance,
  },
  Bet: {
    id: (bet) => bet.id,
    userId: (bet) => bet.userId,
    betAmount: (bet) => bet.betAmount,
    chance: (bet) => bet.chance,
    payout: (bet) => bet.payout,
    win: (bet) => bet.win,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
