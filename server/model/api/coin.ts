export const typeDefs = `
  type AllTimeHigh {
    price: String
    timestamp: Int
  }

  type Supply {
    confirmed: Boolean
    circulating: String
    total: String
  }

  type Links {
    name: String
    url: String
    type: String
  }

  type Coin {
    uuid: String
    symbol: String
    name: String
    description: String
    color: String
    iconUrl: String
    websiteUrl: String
    twenty4hrVolume: String
    marketCap: String
    price: String
    btcPrice: String
    priceAt: Int
    change: String
    rank: Int
    numberOfMarkets: Int
    numberOfExchanges: Int
    listedAt: Int
    coinrankingUrl: String
    allTimeHigh: AllTimeHigh
    sparkline: [String]
    supply: Supply
    links: [Links]
  }

  input CoinArgs { 
    uuid: String!, 
    refCurrUuid: String, 
    timePeriod: String
  }
`