import { Sequelize } from "sequelize";
import { User } from "./models/user";
import { Bet } from "./models/bet";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Initialize the models
User.init({ sequelize });
Bet.init({ sequelize });

// Create any missing tables
sequelize.sync();

// Export the models
export { User, Bet };