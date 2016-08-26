import { CourseItem } from './course-item';

export class UIState {
  public isLoading = false;
  public isHttpError = false;
  public isDataSend = false;

  public static createEmptyState(): UIState {
    return new UIState();
  }

  public cloneState(): UIState {
    let result = new UIState();
    result.isLoading    = this.isLoading;
    result.isHttpError  = this.isHttpError;
    result.isDataSend   = this.isDataSend;
    return result;
  }
}

export class MenuSelection {
  public contact: String;
  public countOfAtendies: String;
  public selectedItems: CourseItem[] = [];

  static createEmptyState(): MenuSelection {
    return new MenuSelection();
  }

  public cloneState(): MenuSelection {
    let result = new MenuSelection();
    result.selectedItems = [...this.selectedItems];
    result.contact = this.contact;
    result.countOfAtendies = this.countOfAtendies;
    return result;
  }

}

export class AppState {

  public items: CourseItem[] = [];
  public menuSelection: MenuSelection;
  public uiState: UIState;

  static createEmptyState(): AppState {
    let result = new AppState();
    result.items          = [];
    result.menuSelection  = MenuSelection.createEmptyState();
    result.uiState        = UIState.createEmptyState();
    return result;
  }

  public cloneState(): AppState {
    let result = new AppState();
    result.items = [...this.items];
    result.menuSelection = this.menuSelection.cloneState();
    result.uiState = this.uiState.cloneState();
    return result;
  }
}
