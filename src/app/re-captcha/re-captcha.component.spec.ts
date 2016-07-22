
import {
  beforeEach,
  addProviders,
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

  it('should create a re-captcha component and inject a script tag', async(() => {
    builder.createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

      fixture.detectChanges();

      let scriptTag = document
        .querySelector('script[src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"]');
      expect(scriptTag).toBeDefined();

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
