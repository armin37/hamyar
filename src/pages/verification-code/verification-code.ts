import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {SignupPage} from "../signup/signup";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {TabsPage} from "../tabs/tabs";

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
    , public httpApi: HttpApiProvider
    , public loadingCtrl: LoadingController
  ) {
    console.log(loader111.dismiss())
    // console.log(this.loadingCtrl.dismiss())
    this.mobile=navParams.get('phoneNumber');
    // console.log(navParams.get('phoneNumber'))
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
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
  }
  checkCode=async()=>
  {
    const phoneNumber: String = this.myForm.value.mobile;
    const vercode: String = this.myForm.value.code;
    let res:any=await this.httpApi.sendPostRequest("/verify",{
      phoneNumber,
      vercode
    })
    if(res){
      await this.storage.set('user',res)
      if(res.role){
        this.navCtrl.push(TabsPage)
      }else{
        this.navCtrl.push(SignupPage)
      }
    }
  }
}
