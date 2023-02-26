import { User } from '../../database/models/user';

const resolvers = {
  Query: {
    getUser: async (parent: any, { id }: { id: number }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error(`User with id ${id} does not exist.`);
        }
        return user;
      } catch (error) {
        throw new Error(`Error retrieving user: ${error.message}`);
      }
    },
    getUserList: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error(`Error retrieving user list: ${error.message}`);
      }
    },
  },
};

export default resolvers;