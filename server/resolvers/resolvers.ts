const axios = require("axios").default;
import * as types from './resolver-types'

let headers = {
  'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.X_RAPIDAPI_KEY
}

const CoinsResolver = async (
  { referenceCurrencyUuid = 'yhjMzLPhuIDl',
    timePeriod = '24h',
    symbols = '',
    uuids = '',
    tiers = '1',
    tags = '',
    orderBy = 'marketCap',
    search =  '',
    orderDirection = 'desc',
    limit = '50',
    offset = '0'
  } : types.CoinsResolverType = {}) => {
  let options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    params: { 
      referenceCurrencyUuid: referenceCurrencyUuid,
      timePeriod: timePeriod,
      symbols: symbols,
      uuids: uuids,
      tiers: tiers,
      tags: tags,
      orderBy: orderBy,
      search:  search,
      orderDirection: orderDirection,
      limit: limit,
      offset: offset
    },
    headers: headers
  };

  let response = await axios.request(options)
  let val = await response.data
  let data = val.data
  //console.log(data)
  await data.coins.forEach((coin : any) => {
    coin['twenty4hrVolume'] = coin['24hVolume']
    delete coin['24hVolume']
  });
  //console.log(data)
  return data
}

const CoinResolver = async ({ 
  uuid, 
  referenceCurrencyUuid = 'yhjMzLPhuIDl', 
  timePeriod = '24h'
} : types.CoinResolverType) => {

  try {
    if (uuid === undefined) {
      throw Error("UUID for CoinResolver is undefined.")
    }

    if (!['3h','24h','7d','30d','3m','1y','3y','5y'].includes(timePeriod)) {
      throw Error("Invalid time period, specify if '3h','24h','7d','30d','3m','1y','3y','5y'")
    }

    let options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
      params: {referenceCurrencyUuid: referenceCurrencyUuid, timePeriod: timePeriod},
      headers: headers
    }

    let response = await axios.request(options)
    let val = await response.data
    let coin = await val.data.coin
    coin['twenty4hrVolume'] = coin['24hVolume']
    delete coin['24hVolume']
    //console.log(coin)
    return coin 
  } catch (e) {
    console.error(e)
  }
}

const CoinPriceHistory = async ({ 
  uuid, 
  referenceCurrencyUuid = 'yhjMzLPhuIDl', 
  timePeriod = '24h'
} : types.CoinPriceHistoryType) => {
  
  try {
    if (uuid === undefined) {
      throw Error("UUID for CoinPriceHistory is undefined.")
    }

    if (!['3h','24h','7d','30d','3m','1y','3y','5y'].includes(timePeriod)) {
      throw Error("Invalid time period, specify if '3h','24h','7d','30d','3m','1y','3y','5y'")
    }

    let options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
      params: {referenceCurrencyUuid: referenceCurrencyUuid, timePeriod: timePeriod},
      headers: headers
    }

    let response = await axios.request(options)
    let val = await response.data
    let history = await val.data
    return history
  } catch (e) {
    console.error(e)
  }
}

const resolvers = {
  Query: {
    async getCoin (parent: any, args: any) { 
      return await CoinResolver(args.inputs) 
    },

    async getCoins(parent: any, args: any) {
      return await CoinsResolver(args.inputs)
    },

    async getCoinPriceHistory(parent: any, args: any) {
      return await CoinPriceHistory(args.inputs)
    }
  },

  Coins: {
    async coins (parent: any, args: any) {
      try {
        let result = parent.coins

        if ("filter" in args) {
          result = await result.filter((coin : any) => (eval(args.filter)))
        }

        if ("sort" in args) {
          result = await result.sort((a: any, b: any) => {
            let direction = args.sort.direction
            let target = args.sort.target
            switch (direction) {
              case "descending":
                return b[target] - a[target]
              default:
                return a[target] - b[target]
            }
          })
        }

        return result
      } catch (e) {
        console.error(e)
      }
    }
  }
};



export default resolvers