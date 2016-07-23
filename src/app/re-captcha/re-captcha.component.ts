import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  NgZone
} from '@angular/core';


declare var grecaptcha: { render: Function };

@Component({
  moduleId: module.id,
  selector: 're-captcha',
  template: '',
  directives: [ ],
  providers: [ ]
})
export class ReCaptchaComponent implements OnInit {

  @Input() public sitekey: string = null;
  @Output() private token = new EventEmitter();

  constructor(private elRef: ElementRef, private ngZone: NgZone) {
    window['onloadCallback'] = this.onloadCallback.bind(this);
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
      this.token.emit({token});
    });
  }
}
