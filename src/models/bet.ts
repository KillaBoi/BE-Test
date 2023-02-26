import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user';

class Bet extends Model {
  public id!: number;
  public userId!: number;
  public betAmount!: number;
  public chance!: number;
  public payout!: number;
  public win!: boolean;

  public static async createBet(
    userId: number,
    betAmount: number,
    chance: number
  ): Promise<Bet> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (betAmount <= 0 || betAmount > user.balance) {
      throw new Error(`Invalid bet amount`);
    }

    if (chance <= 0 || chance > 100) {
      throw new Error(`Invalid chance value`);
    }

    const payout = 100 / chance;
    const win = Math.random() * 100 < chance;

    const bet = await Bet.create({
      userId,
      betAmount,
      chance,
      payout,
      win,
    });

    if (win) {
      await user.increment({ balance: payout * betAmount });
    } else {
      await user.decrement({ balance: betAmount });
    }

    return bet;
  }
}

const initBetModel = (sequelize: Sequelize) => {
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
          model: User,
          key: 'id',
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
      },
    },
    { sequelize }
  );
};

export { Bet, initBetModel };
