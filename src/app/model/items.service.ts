import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http,
  Headers,
  Response,
  RequestOptions
} from '@angular/http';
import { CourseItem } from './course-item';
import {
  SERVER_URL_TOKEN
} from './../consts';
import { MenuSelection } from './app-state';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';


export interface IItemsService {
  loadItems(): Observable<CourseItem[]>;
  sendSelections(selecttion: MenuSelection, token: String): Observable<boolean>;
}

@Injectable()
export class ItemsService implements IItemsService {

  constructor(private http: Http, @Inject(SERVER_URL_TOKEN) private serverUrl: string) {}

  public loadItems(): Observable<CourseItem[]> {
    return this.http.get(this.serverUrl + '/courses', {headers: new Headers({})})
      .delay(750)
      .map((r: Response) => r.json().courses as CourseItem[]);
  }

  public sendSelections(selection: MenuSelection, token: String): Observable<boolean> {
    let body = JSON.stringify(selection);

    let headers = new Headers({ 'Content-Type': 'application/json', 'google-token': token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl + '/courses/addSelection', body, options)
      .delay(750)
      .map(() => true );
  }

}
