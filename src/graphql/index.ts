import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import typeDefs from './schema';
import resolvers from './resolvers';
import { User } from '../database/models';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return {};
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];

    try {
      // Verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };

      // Look up user in database
      const user = await User.findByPk(userId);
      if (!user) {
        return {};
      }

      // Add user to context
      return { user };
    } catch (err) {
      console.error('Error verifying JWT:', err);
      return {};
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});