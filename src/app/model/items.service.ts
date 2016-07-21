import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import { Item } from './item';
import {Observable} from 'rxjs/Rx';

export interface IItemsService {
  loadItems(): Observable<Item[]>;
}

@Injectable()
export class ItemsService implements IItemsService {

  constructor(private http: Http) {}

  public loadItems(): Observable<Item[]> {
    return this.http.get('rest/items')
      .map((r: Response) => r.json().data as Item[]);
  }

}
