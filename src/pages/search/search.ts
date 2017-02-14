import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';
import * as  debug        from 'debug';
import { OfflineDb }      from '../../services/offlineDb';
import { TickerViewer }   from '../tickerviewer/tickerviewer';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [OfflineDb]
})
export class SearchPage {

  log: any = null;
  offlineDb: OfflineDb = null;
  items: string[];

  constructor(public navCtrl: NavController, offlineDb: OfflineDb) {
    this.log = debug('page-search');
    this.log('page-search');
    this.offlineDb = offlineDb;
  }


  getItems(ev: any) {
    this.log('getItems');

    let val = ev.target.value;


    let alltickers = this.offlineDb.getAllTickers();

    alltickers.then( (items) => {

        this.items = items.data.tickers;
        if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        }

    });


    alltickers.catch( (err) => {
        this.log(err);        
    });
  }

  loadTicker(ticker: string) {
    this.navCtrl.push(TickerViewer, {
      ticker: ticker,
      year: 2017
    });
  }
  
}
