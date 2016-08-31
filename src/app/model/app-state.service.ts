import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {
  Injectable,
  Provider,
  Type
} from '@angular/core';

import { AppState } from './app-state';
import {AppStateInjector} from './app-state.injector';


export interface IAppAction {
  createNewState(curentState: AppState): AppState;
}

@Injectable()
export class AppStateService {

  private appStateSubject: BehaviorSubject<AppState>;
  private actionDispatcher = new Subject();

  constructor(private injector: AppStateInjector) {
    let initState = AppState.createEmptyState();

    let appStateSubject = this.actionDispatcher.scan( (state: AppState, action) => {

      return action.createNewState(state);

    }, initState);

    this.appStateSubject = this.wrapIntoBehaviorSubject(initState, appStateSubject);
  }

  private wrapIntoBehaviorSubject(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
  }

  public getAppState(): Observable<AppState> {
    return this.appStateSubject.share();
  }

  public getLastAppState(): AppState {
    return this.appStateSubject.getValue();
  }


  public dispatchAction(actionClass: Type, providers?: Array<Type | Provider | {[k: string]: any} | any[]>) {
    const action = this.injector.resolveAndInstantiate(actionClass, providers);
    this.actionDispatcher.next(action);
  }

}
