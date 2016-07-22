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
    // let script = document.createElement('script');
    // script.innerHTML = '';
    // script.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit';
    // script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);
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
