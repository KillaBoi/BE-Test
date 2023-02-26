import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public balance!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);
