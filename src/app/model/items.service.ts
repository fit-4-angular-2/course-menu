import {
  Injectable,
  Inject
} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions
} from '@angular/http';
import { CourseItem } from './course-item';
import {
  SERVER_URL_TOKEN
} from './../consts';
import { AppState } from './app-state';



export interface IItemsService {
  loadItems(): Promise<CourseItem[]>;
  sendSelections(selecttion: AppState, token: String): Promise<boolean>;
}

@Injectable()
export class ItemsService implements IItemsService {

  constructor(private http: Http, @Inject(SERVER_URL_TOKEN) private serverUrl: string) {}

  public loadItems(): Promise<CourseItem[]> {
      return this.http.get(this.serverUrl + '/courses').toPromise().then( (reponse) => {
          return <CourseItem[]> reponse.json().courses;
      });
  }

  public sendSelections(selection: AppState, token: String): Promise<boolean> {
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
