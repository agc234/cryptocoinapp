import { typeDefs as Coin } from './api/coin'
import { typeDefs as Coins } from './api/coins'
import { typeDefs as CoinPriceHistory } from './api/coinhistory'
import { gql } from 'apollo-server';

let merged = [
  Coin,
  Coins,
  CoinPriceHistory
].join("\n")

const Query = gql`

  ${merged}

  type Query {
    getCoins(inputs: CoinsArgs): Coins
    getCoin(inputs: CoinArgs!): Coin
    getCoinPriceHistory(inputs: CoinPriceHistoryArgs!): CoinPriceHistory
  }
`

export default Query