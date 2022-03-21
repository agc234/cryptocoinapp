export const typeDefs = `
  type History {
    price: String
    timestamp: Int
  }
  
  type CoinPriceHistory {
    change: String
    history: [History]
  }

  input CoinPriceHistoryArgs { 
    uuid: String!, 
    refCurrUuid: String, 
    timePeriod: String
  }
`