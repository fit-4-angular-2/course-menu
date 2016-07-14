import { CourseMenuPage } from './app.po';

describe('course-menu App', function() {
  let page: CourseMenuPage;

  beforeEach(() => {
    page = new CourseMenuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
