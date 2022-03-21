export const typeDefs = `
  type CoinDatum {
    uuid: String
    symbol: String
    name: String
    color: String
    iconUrl: String
    marketCap: String
    price: String
    btcPrice: String
    listedAt: Int
    change: String
    rank: Int
    coinrankingUrl: String
    twenty4hrVolume: String
    sparkline: [String]
  }

  type Stats {
    total: Int
    totalCoins: Int
    totalMarkets: Int
    totalExchanges: Int
    totalMarketCap: String
    total24hVolume: String
  }

  input Sort {
    target: String
    direction: String
  }

  type Coins {
    coins(filter: String, sort: Sort): [CoinDatum]
    stats: Stats
  }

  input CoinsArgs { 
    referenceCurrencyUuid: String,
    timePeriod: String,
    symbols: String,
    uuids: String,
    tiers: String,
    tags: String,
    orderBy: String,
    search:  String,
    orderDirection: String,
    limit: String,
    offset: String
  }
`