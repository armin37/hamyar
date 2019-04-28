import {Component, Inject} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpApiProvider} from "../../providers/http-api/http-api";

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  myForm: FormGroup;
  text: AbstractControl;
  image:string;
  video:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              formBuilder: FormBuilder
    , public httpApi: HttpApiProvider
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private http: HttpClient
    , private storage: Storage) {
    this.myForm = formBuilder.group({
      'text': ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
      ]
    });
    this.text = this.myForm.controls['text'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }
  close(){
    this.navCtrl.pop();
  }

  newPost=async()=> {

    let user:any=await this.storage.get("user");
    let content:any=this.myForm.value.text;
    let res=await this.httpApi.sendPostRequest("/post/create",{
      content,
      userId:user._id
    })
    if(res){
      this.navCtrl.pop();
    }
  }
}
