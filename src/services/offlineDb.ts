import { debug }          from 'debug';
import { Injectable }     from '@angular/core';

@Injectable()
export class OfflineDb {

  log: any = null;

  constructor() {
    this.log = debug('offlineDb');
    this.log('offlneDb');
  }


  getAllTickers() {

  }
}
