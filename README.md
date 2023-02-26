requires apollo-server, graphql, sequelize, pg

npx sequelize-cli db:migrate

npm run start

# Query test
query {
  getUserList {
    id
    name
    balance
  }
}








# Bet test

mutation {
  createBet(userId: 1, betAmount: 5, chance: 20) {
    id
    user {
      id
      name
    }
    betAmount
    chance
    payout
    win
  }
}

