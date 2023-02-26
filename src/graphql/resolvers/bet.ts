import { Bet, User } from "../../database";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(Bet)
export class BetResolver {
  @Query(() => Bet, { nullable: true })
  async getBet(@Arg("id") id: number) {
    return await Bet.findByPk(id);
  }

  @Query(() => [Bet])
  async getBetList() {
    return await Bet.findAll();
  }

  @Mutation(() => Bet)
  async createBet(
    @Arg("userId") userId: number,
    @Arg("betAmount") betAmount: number,
    @Arg("chance") chance: number
  ) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    if (user.balance < betAmount) {
      throw new Error("Insufficient balance");
    }

    const payout = 1 / chance;
    const win = Math.random() < chance;

    const newBet = await Bet.create({
      userId,
      betAmount,
      chance,
      payout,
      win,
    });

    if (win) {
      user.balance += betAmount * payout;
      await user.save();
    } else {
      user.balance -= betAmount;
      await user.save();
    }

    return newBet;
  }

  @Query(() => [Bet])
  async getBestBetPerUser(@Arg("limit") limit: number) {
    const subQuery = `(SELECT MAX(payout) FROM bets b WHERE b.userId = bets.userId)`;

    return await Bet.findAll({
      where: `(payout, userId) IN ${subQuery}`,
      limit,
    });
  }
}