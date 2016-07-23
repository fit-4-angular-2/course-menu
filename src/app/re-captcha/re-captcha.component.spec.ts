
import {
  beforeEach,
  describe,
  expect,
  async,
  it,
  inject,
  TestComponentBuilder,
  ComponentFixture
} from '@angular/core/testing';
import { ReCaptchaComponent } from './re-captcha.component';
import {
  Component
} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ReCaptcha Component', () => {

  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (_builder: TestComponentBuilder) => {
    builder = _builder;
  }));

  it('should emit the token', async(() => {
    builder.createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

      fixture.detectChanges();

      let reCaptchaComponent = fixture.debugElement.query(By.directive(ReCaptchaComponent)).componentInstance;

      reCaptchaComponent.onTokenCallback('test');

    });
  }));
});

@Component({
  selector: 'test-test',
  template: '<re-captcha (token)="onToken"></re-captcha>',
  directives: [ReCaptchaComponent]
})
class TestComponent {
  public token: string;

  public onToken({token}) {
    this.token = token;
  }
}
