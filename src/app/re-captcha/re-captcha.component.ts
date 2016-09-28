import {
  Component,
  ElementRef,
  OnInit,
  Input,
  NgZone,
  forwardRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

// https://www.google.com/recaptcha/admin#list
declare var grecaptcha: { render: Function };

@Component({
  selector: 're-captcha',
  template: '',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ReCaptchaComponent),
    multi: true
  } ]
})
export class ReCaptchaComponent implements OnInit, ControlValueAccessor {

  @Input() public sitekey: string = null;
  private token;
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  constructor(private elRef: ElementRef, private ngZone: NgZone) {
    window['onloadCallback'] = this.onloadCallback.bind(this);
  }

  /**
   * Write a new value to the element.
   */
  public writeValue(obj: any) {
    this.token = obj;
    if (this.onChangeCallback ) {
      this.onChangeCallback(this.token);
    }
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public ngOnInit() {
      if (!this.sitekey) {
        return;
      }
      // this code results in a  Script error. Chrome 46.0.2490 (Linux 0.0.0) ERROR
      // => this code can not be tested on travis ci - sitekey is used to exclude the code
      // from the tests - see template for TestComponent
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
      let anyScriptTag = document.getElementsByTagName('script')[0];
      anyScriptTag.parentNode.insertBefore(script, anyScriptTag);
  }

  private onloadCallback() {
    grecaptcha.render(this.elRef.nativeElement, {
      'sitekey' : this.sitekey,
      'callback' : this.onTokenCallback.bind(this),
      'theme' : 'light'
    });
  }

  public onTokenCallback(token) {
    this.ngZone.run( () => {
      this.token = token;
      if (this.onChangeCallback ) {
        this.onChangeCallback(this.token);
      }
    });
  }
}
