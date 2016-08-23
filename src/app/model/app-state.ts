import { CourseItem } from './course-item';

export class AppState {

  public items: CourseItem[] = [];
  public contact: String;
  public countOfAtendies: String;

  static createEmptyState(): AppState {
    let result = new AppState();
    result.items = [];
    result.contact = null;
    result.countOfAtendies = null;
    return result;
  }

  public cloneState(): AppState {
    let result = new AppState();
    result.items = [...this.items];
    result.contact = this.contact;
    result.countOfAtendies = this.countOfAtendies;
    return result;
  }
}
