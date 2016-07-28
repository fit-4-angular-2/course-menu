import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http
} from '@angular/http';
import { Item } from './item';
import {
  Observable,
  ReplaySubject
} from 'rxjs/Rx';
import {
  SERVER_URL_TOKEN
} from './../consts';


export interface IItemsService {
  loadItems(): Observable<Item[]>;
}

@Injectable()
export class ItemsService implements IItemsService {

  private dataObs = new ReplaySubject<Item[]>(1);

  constructor(private http: Http, @Inject(SERVER_URL_TOKEN) private serverUrl: string) {}

  public loadItems(forceRefresh?: boolean): Observable<Item[]> {
    // On Error the Subject will be Stoped and Unsubscribed, if so, create another one
    this.dataObs = this.dataObs.isUnsubscribed ? new ReplaySubject<Item[]>(1) : this.dataObs;

    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!this.dataObs.observers.length || forceRefresh) {
      this.http.get(this.serverUrl + '/courses')
        .subscribe(
          requestData => {
            this.dataObs.next(requestData.json().courses as Item[]);
          },
          error => this.dataObs.error(error));
    }

    return this.dataObs;
  }

}
