import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';
import { Item } from './item';
import {
  SERVER_URL_TOKEN
} from './../consts';
import { MenuSelection } from './menuSelection';



export interface IItemsService {
  loadItems(): Promise<Item[]>;
  sendSelections(selecttion: MenuSelection, token: String): Promise<boolean>;
}

@Injectable()
export class ItemsService implements IItemsService {

  constructor(private http: Http, @Inject(SERVER_URL_TOKEN) private serverUrl: string) {}

  public loadItems(forceRefresh?: boolean): Promise<Item[]> {
      return this.http.get(this.serverUrl + '/courses').toPromise().then( (reponse) => {
          return <Item[]> reponse.json().courses;
      });
  }

  public sendSelections(selection: MenuSelection, token: String): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let body = JSON.stringify(selection);
      let headers = new Headers({ 'Content-Type': 'application/json', 'google-token': token });
      let options = new RequestOptions({ headers: headers });

      this.http.post(this.serverUrl + '/courses/addSelection', body, options).subscribe(
        (response) => {
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );


    });
  }

}
