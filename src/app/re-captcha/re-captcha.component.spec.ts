
import {
  TestBed
} from '@angular/core/testing';
import { ReCaptchaComponent } from './re-captcha.component';
import {
  Component
} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ReCaptcha Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ReCaptchaComponent, TestComponent],
    });
  });

  it('should emit the token', ( done ) => {
    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    let reCaptchaComponent = fixture.debugElement.query(By.directive(ReCaptchaComponent)).componentInstance;

    reCaptchaComponent.onTokenCallback('test');

    done();

  });
});

@Component({
  selector: 'test-test',
  template: '<re-captcha (token)="onToken"></re-captcha>'
})
class TestComponent {
  public token: string;

  public onToken({token}) {
    this.token = token;
  }
}
