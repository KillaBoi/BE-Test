import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user";

export class Bet extends Model {
  public id!: number;
  public userId!: number;
  public betAmount!: number;
  public chance!: number;
  public payout!: number;
  public win!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: () => Promise<User>;

  public static associations: {
    user: {
      association: Model.BelongsToCreateAssociationMixin<User>;
      get: Model.BelongsToGetAssociationMixin<User>;
    };
  };
}

Bet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    betAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    chance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payout: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "bets",
    sequelize,
  }
);

Bet.belongsTo(User, { foreignKey: "userId", as: "user" });
