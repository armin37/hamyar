import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {SignupPage} from "../signup/signup";

/**
 * Generated class for the VerificationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html',
})
export class VerificationCodePage {
  myForm: FormGroup;
  mobile: AbstractControl;
  code: AbstractControl;
  warningMessage: boolean = false;
  messageText: string;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , formBuilder: FormBuilder
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private http: HttpClient
    , private storage: Storage
    , public loadingCtrl: LoadingController
  ) {
    this.myForm = formBuilder.group({
      'mobile': [this.mobile, Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
      ],
      'code': ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])
      ]
    });
    this.mobile = this.myForm.controls['mobile'];
    this.code = this.myForm.controls['code'];
    // this.storage.ready().then(() => {
    //   this.storage.get('mobile').then((val) => {
    //     if (val) {
    //       console.log(val);
    //       this.mobile.setValue(val);
    //     }
    //     else {
    //       this.navCtrl.setRoot(LoginPage);
    //     }
    //   }).catch(() => {
    //     this.navCtrl.setRoot(LoginPage);
    //   })
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
  }
  checkCode()
  {
    this.navCtrl.push(SignupPage)
  }
}
