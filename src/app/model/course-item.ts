export class CourseItem {
  title: string;
  explanation: string;
  selected: boolean;

  constructor(title: string, explanation: string, selected = false) {
    this.title = title;
    this.explanation = explanation;
    this.selected = selected;
  }

}
