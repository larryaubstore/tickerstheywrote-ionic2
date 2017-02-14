import * as debug         from 'debug';
import { Injectable }     from '@angular/core';
import * as  axios        from 'axios';

@Injectable()
export class OfflineDb {

  log: any = null;

  constructor() {
    this.log = debug('offlineDb');
    this.log('offlneDb');
  }


  getAllTickers() {
    return axios.get('http://www.tickerstheywrote.com/alltickers.json');
  }


  getTickerDetail(ticker: string, year: number) {
    // http://www.tickerstheywrote.com/tickerhistory/graph.json?year=2017&ticker=AMZN
    return axios.get('http://www.tickerstheywrote.com/tickerhistory/graph.json?year=' 
                     + year + '&ticker=' + ticker);
  }
}
