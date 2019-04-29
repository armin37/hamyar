import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {IonicStorageModule, Storage} from "@ionic/storage";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {VerificationCodePage} from "../verification-code/verification-code";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {TabsPage} from "../tabs/tabs";
import {Camera,CameraOptions} from "@ionic-native/camera";

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
  private base64Image: any;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private camera: Camera
    , formBuilder: FormBuilder
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private http: HttpClient
    , private storage: Storage
    , public httpApi: HttpApiProvider
    , public loadingCtrl: LoadingController) {
    let unamePattern = "^[a-z0-9_-]{3,30}$";
    this.myForm = formBuilder.group({
      'name': ['', Validators.compose([
        Validators.pattern(unamePattern),
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ])
      ],
      'bio': ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
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

  registerUser = async () => {
    const name: String = this.myForm.value.name;
    const bio: String = this.myForm.value.bio;
    const role: String = this.role === "کاربر" ? "MEMBER" : "DOCTOR";
    const photo: String = this.base64Image
    const user: any = await this.storage.get('user')

    // this.navCtrl.push(VerificationCodePage);
    // loading.dismiss();
    // if (phoneNumber != null && phoneNumber.length === 11) {
    let res = await this.httpApi.sendPostRequest("/signup", {
      phoneNumber: user.phoneNumber,
      name,
      role,
      photo,
      bio
    })
    if (res) {
      await this.storage.set('user', res)
      this.navCtrl.push(TabsPage);
    }
    // }
  }
  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      // this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      this.base64Image = /*'data:image/jpeg;base64,' +*/ imageData;
    }, (err) => {
      // Handle error
    });
  }
}
