import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  name: AbstractControl;
  bio: AbstractControl;
  role: string = 'کاربر';
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
      'name': ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
      ],
      'bio': ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])
      ]
    });

    this.name = this.myForm.controls['name'];
    this.bio = this.myForm.controls['bio'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  segmentChanged(d) {
    this.role = d;
  }

}
