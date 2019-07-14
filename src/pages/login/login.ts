import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VerificationCodePage} from "../verification-code/verification-code";
import {Storage} from "@ionic/storage";
import {HttpApiProvider} from "../../providers/http-api/http-api";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
global.loader111=null;

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
    , public httpApi: HttpApiProvider
    , private storage: Storage
    , formBuilder: FormBuilder
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private http: HttpClient
    , public loadingCtrl: LoadingController,
  ) {
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

  checkUserMobile=async()=>{
    const phoneNumber: String = this.myForm.value.mobile;
    // this.navCtrl.push(VerificationCodePage);
    loader111 = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
    loader111.present();
    // if (phoneNumber != null && phoneNumber.length === 11) {
    //   let res=await this.httpApi.sendPostRequest("/login",{phoneNumber})
    //   if(res){
        this.navCtrl.push(VerificationCodePage,{
          phoneNumber
        });
      // }
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
