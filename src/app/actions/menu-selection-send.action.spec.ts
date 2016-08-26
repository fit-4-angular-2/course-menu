import { MenuSelectionSendAction } from './menu-selection-send.action';
import {
  AppState,
  MenuSelection
} from '../model/app-state';
import { oneItem } from './../model/items.service.spec';

describe('MenuSelectionSendAction', () => {

  it('should create a nice state after the selection is send to the server', () => {

    let action = new MenuSelectionSendAction();

    let initState = AppState.createEmptyState();
    initState.menuSelection = MenuSelection.createEmptyState();
    initState.menuSelection.items = oneItem;
    initState.menuSelection.contact = 'contact';
    initState.menuSelection.countOfAtendies = '1';

    let resultState = action.createNewState(initState);
    let uiState = resultState.uiState;

    expect(uiState.isLoading).toBe(false, 'there is no http call in progress');
    expect(uiState.isDataSend).toBe(true, 'the selection was send');
    expect(uiState.isHttpError).toBe(false, 'no, there are no errors');

    expect(resultState.menuSelection.items.length).toBe(1, 'the selected items are still there');

  });

});
