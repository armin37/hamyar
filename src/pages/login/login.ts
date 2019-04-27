import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VerificationCodePage} from "../verification-code/verification-code";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  mobile: AbstractControl;
  warningMessage: boolean = false;
  messageText: string;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , formBuilder: FormBuilder
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private http: HttpClient
    , private storage: Storage
    , public loadingCtrl: LoadingController) {
    this.myForm = formBuilder.group({
      'mobile': ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
      ]
    });
    this.mobile = this.myForm.controls['mobile'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  checkUserMobile() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();
    const mobile: String = this.myForm.value.mobile;
    this.navCtrl.push(VerificationCodePage);
    loading.dismiss();
    // if (mobile != null && mobile.length === 11) {
    //
    //   const headers: HttpHeaders = new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   });
    //   this.http.post(this.apiBaseUrl.concat("/register"),
    //     {
    //       "number": mobile.toString(),
    //     },
    //     {
    //       headers: headers
    //     },
    //   )
    //     .subscribe(data => {
    //         this.storage.ready().then(() => {
    //             this.storage.set("mobile", mobile);
    //             this.navCtrl.push(VerificationCodePage);
    //           }
    //         );
    //         loading.dismiss();
    //       },
    //       response => {
    //         console.log(response);
    //         this.showAlert("خطا!", response['error']['message']);
    //         loading.dismiss();
    //       }
    //     )
    // }
  }

  showAlert(header: string, message: string) {
    this.messageText = message;
    this.warningMessage = true;
    setTimeout(() => {
      this.warningMessage = false;
    }, 3000);
  }

  removeWarningMessage() {
    this.warningMessage = false;
  }

}
