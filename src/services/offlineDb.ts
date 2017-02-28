import * as debug             from 'debug';
import { Injectable }         from '@angular/core';
import * as  axios            from 'axios';
import * as PouchDB           from 'pouchdb';
import { Network }            from 'ionic-native';
import { Platform }           from "ionic-angular";
import PouchAdapterCordovaSqlite from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class OfflineDb {

  log: any = null;
  disconnectSub: any = null;
  connectSub: any = null;
  offline: boolean = false;
  tickerDetailDB: any = null;

  constructor(private platform: Platform) {
    this.log = debug('offlineDb');
    this.log('offlneDb');

    this.connectSub = Network.onConnect().subscribe( () => this.onConnect);
    this.disconnectSub = Network.onDisconnect().subscribe( () => this.onDisconnect);

    PouchDB.plugin(PouchAdapterCordovaSqlite);
    let adapter = this.platform.is('cordova') ? 'cordova-sqlite' : 'websql';
    console.log('platform ==> ' + adapter);
      
    this.tickerDetailDB = new PouchDB('tickerDetail.db', { adapter: adapter });
    //this.tickerDetailDB = new PouchDB('tickerDetail.db');
  }


  getAllTickers() : Promise<any> {
    return axios.get('http://www.tickerstheywrote.com/alltickers.json');
  }


  getTickerDetail(ticker: string, year: number) : Promise<any> {


    return new Promise( (resolve, reject) => {


      if (this.offline) {
          this.tickerDetailDB.get(ticker).then( (doc) => {
            resolve(doc);
          }).catch( (err) => {
            reject(err); 
          });

      } else {
        // http://www.tickerstheywrote.com/tickerhistory/graph.json?year=2017&ticker=AMZN
        let getCall : Promise<any> =  axios.get('http://www.tickerstheywrote.com/tickerhistory/graph.json?year=' 
                         + year + '&ticker=' + ticker);

        getCall.then( (items) => {
  
          this.tickerDetailDB.get(ticker).then( (doc) => {
            return this.tickerDetailDB.remove(doc);
          }).catch(function (err) {
            if (err.status !== 404) {
              resolve(err);
            } else {
              return;
            }
          }).then( () => {
            return this.tickerDetailDB.put({ _id: ticker, data: items.data });
          }).then( () => {
            resolve(items);  
          }).catch( (err) => {
            reject(err);
          });
        });
      }
    });
  }

  onConnect() : void  {
    this.log('onConnect');
    this.offline = false;
  }

  onDisconnect() : void  {
    this.log('onDisconnect');
    this.offline = true;
  }
}
