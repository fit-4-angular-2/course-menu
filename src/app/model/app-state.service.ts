import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {
  Injectable,
  Injector,
  ReflectiveInjector,
  Provider,
  Type, DynamicComponentLoader
} from '@angular/core';

import { AppState } from './app-state';


export interface IAppAction {
  createNewState(curentState: AppState): AppState;
}

@Injectable()
export class AppStateService {

  private appStateSubject: BehaviorSubject<AppState>;
  private actionDispatcher = new Subject();

  constructor(private injector: Injector) {
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

  // TODO how to make sure that this is of type IAppAction
  public dispatchAction(actionClass: any, providers?: Array<Type | Provider | {[k: string]: any} | any[]>) {

    const localProviders = providers ? [...providers] : [];

    let binding = ReflectiveInjector.resolve(localProviders);
    const childInjector = ReflectiveInjector.fromResolvedProviders(binding, this.injector);

    const action = childInjector.resolveAndInstantiate(actionClass);

    // console.log('action instance', action);

    if (!action.createNewState) {
      throw new Error(`instance of ${actionClass.name} did not conform to the IAppAction interface`);
    }

    this.actionDispatcher.next(action);
  }

}
