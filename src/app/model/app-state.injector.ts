import {
  Injectable,
  Injector,
  ReflectiveInjector,
  Provider
} from '@angular/core';
import {IAppAction} from './app-state.service';
import { Type } from '@angular/core/src/type';


@Injectable()
export class AppStateInjector {

  private clazzMap = new Map<Type<IAppAction>, any>();



  constructor(private injector: Injector) {
  }

  // how to make sure that acitonClass is of type IAppAction
  public resolveAndInstantiate(
    actionClass: any,
    providers?: [Provider]): IAppAction {

      console.log('appstateinjector', this.injector);

    // create a possibly emoty array of additional providers
    const localProviders = providers ? [...providers] : [];

    // check if there is any replacement required
    const requiredType = this.clazzMap.get(actionClass) ? this.clazzMap.get(actionClass) : actionClass;

    const action  = ReflectiveInjector.resolveAndCreate(localProviders, this.injector).get(requiredType);

    // resolve the additional providers
    // let binding = ReflectiveInjector.resolveAndCreate(localProviders, this.injector); // .resolve(localProviders);

    // create a child injector with the appmodule injector as it's parent
    // const childInjector = ReflectiveInjector.fromResolvedProviders(binding, this.injector);

    // const action = childInjector.get(requiredType);
    // instanitate the requested aciton
    // const action = childInjector.resolveAndInstantiate(requiredType);

    // check that the aciton conforms to the IAppAction interface
    if (!action.createNewState) {
      throw new Error(`instance of ${actionClass} did not conform to the IAppAction interface`);
    }

    // puh! done!
    return action;
  }

  // make it possible to override the default aciton types. for example:
  // appStateInjector.replaceTokenWithClass(SendMenuSelectionAction, DummySendMenuSelectionAction);
  // this will instanciate DummySendMenuSelectionAction if SendMenuSelectionAction is requested.
  // this will imporve testablility.
  public replaceTokenWithClass(token: any, clazz: any) {
    this.clazzMap.set(token, clazz);
  }
}
