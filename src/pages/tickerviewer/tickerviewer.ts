import { Component, OnInit }          from '@angular/core';
import { NavController, NavParams }   from 'ionic-angular';
import * as  debug                    from 'debug';
import { OfflineDb }                  from '../../services/offlineDb';

@Component({
  selector: 'tickerviewer',
  templateUrl: 'tickerviewer.html',
  providers: [OfflineDb]
})


export class TickerViewer implements OnInit {

  log: any = null;
  offlineDb: OfflineDb = null;
  items: string[];

  year: number;
  ticker: string;
  selected = false;

  constructor(public navCtrl: NavController, 
              offlineDb: OfflineDb,
              public navParams: NavParams) {
    this.log = debug('tickerviewer');
    this.log('tickerviewer');
    this.offlineDb = offlineDb;
  }

  ngOnInit() {
    this.log('ngOnInit');
    this.ticker = this.navParams.get('ticker');
    this.year   = this.navParams.get('year');

    this.getItems(this.ticker, this.year);
  }


  getItems(ticker: string, year: number) {
    this.log('getItems');
    let tickerDetail = this.offlineDb.getTickerDetail(ticker, year);

    tickerDetail.then( (items) => {
        this.items = items.data;
    });


    tickerDetail.catch( (err) => {
        this.log(err);        
    });
  }

  addTicker() {
    this.selected = !this.selected;
  }

}


