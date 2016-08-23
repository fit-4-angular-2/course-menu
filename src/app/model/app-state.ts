import { CourseItem } from './course-item';

export class UIState {
  isLoading = false;
  isHttpError = false;
}

export class AppState {

  public items: CourseItem[] = [];
  public contact: String;
  public countOfAtendies: String;
  public uiState: UIState;

  static createEmptyState(): AppState {
    let result = new AppState();
    result.items = [];
    result.contact = null;
    result.countOfAtendies = null;
    result.uiState = { isLoading: false, isHttpError: false};
    return result;
  }

  public cloneState(): AppState {
    let result = new AppState();
    result.items = [...this.items];
    result.contact = this.contact;
    result.countOfAtendies = this.countOfAtendies;
    result.uiState = {isLoading: this.uiState.isLoading, isHttpError: this.uiState.isHttpError};
    return result;
  }
}
