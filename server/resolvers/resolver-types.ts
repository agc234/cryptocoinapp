export interface CoinResolverType { 
    uuid: string | undefined, 
    referenceCurrencyUuid?: string, 
    timePeriod?: string 
  }
  
export interface CoinsResolverType {
    referenceCurrencyUuid?: string,
    timePeriod?: string,
    symbols?: string,
    uuids?: string,
    tiers?: string,
    tags?:  string,
    orderBy?: string,
    search?: string,
    orderDirection?: string,
    limit?: string,
    offset?: string,
}

export interface CoinPriceHistoryType extends CoinResolverType {}