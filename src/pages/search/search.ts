import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';
import { debug }          from 'debug';
import { OfflineDb }      from '../../services/offlineDb';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  log: any = null;
  offlineDb: OfflineDb = null;

  constructor(public navCtrl: NavController, offlineDb: OfflineDb) {
    this.log = debug('page-search');
    this.log('page-search');
    this.offlineDb = offlineDb;
  }
}
