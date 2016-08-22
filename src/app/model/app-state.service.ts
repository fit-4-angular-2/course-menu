import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import {MenuSelection} from './menuSelection';


export interface IAppAction {
  createNewState(curentState: MenuSelection): MenuSelection;
}

export class AppStateService {

  private appStateSubject: BehaviorSubject<MenuSelection>;
  private actionDispatcher = new Subject();

  constructor() {
    let initState = new MenuSelection();
    let appStateSubject = this.actionDispatcher.scan( (state: MenuSelection, action) => {

      return action.createNewState(state);

    }, initState);

    this.appStateSubject = this.wrapIntoBehaviorSubject(initState, appStateSubject);
  }

  private wrapIntoBehaviorSubject(init, obs) {
    const res = new BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
  }

  public getAppState(): Observable<MenuSelection> {
    return this.appStateSubject.share();
  }

  public getLastAppState(): MenuSelection {
    return this.appStateSubject.getValue();
  }

  public dispatchAction(action: IAppAction) {
    this.actionDispatcher.next(action);
  }

}
