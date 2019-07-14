import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {Storage} from "@ionic/storage";
import {FormBuilder} from "@angular/forms";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {HttpClient} from "@angular/common/http";
import {PersonalPage} from "../personal/personal";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  private user: any={};
  private posts: any=[];
  private suser: any;

  constructor(
     public httpApi: HttpApiProvider
    , formBuilder: FormBuilder
    , private http: HttpClient
    , private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
     private share: SocialSharing) {
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }
  ionViewDidLoad() {
    this.init();
  }

  sharePost(post) {
    if(post.file)
      this.share.share(null, post.content,  null,post.file);
    else
      this.share.share(null, post.content, null, null);
  }

  goToChat(name) {
    this.navCtrl.push(ChatPage,{name})
  }

  private init=async()=> {
    this.user=await this.storage.get('user')
    let res=await this.httpApi.sendPostRequest('/profile',{
      phoneNumber:this.user.phoneNumber
    });
    if(Array.isArray(res)){
      this.posts=res[1];
      this.user=res[0];
      this.mentored=this.user.mentored!=="NO"
      this.mentoring=this.user.mentoring!=="NO"
    }
  }
  mentored: any=false;
  mentoring: any=false;
  changeMentoredStatus=async(event)=>{
    const phoneNumber: any = this.user.phoneNumber;
    const status: any = event.checked?"YES":"NO";
    await this.httpApi.sendPostRequest("/mentoring/"+status, {
      phoneNumber,
    })
  }

  changeMentoringStatus=async(event)=>{
    const phoneNumber: any = this.user.phoneNumber;
    const status: any = event.checked?"YES":"NO";
    await this.httpApi.sendPostRequest("/mentored/"+status, {
      phoneNumber,
    })
  }
  like = async (postId, index) => {
    const userId: any = this.user._id;
    let res: any = await this.httpApi.sendPostRequest("/post/like", {
      userId,
      postId
    })
    if (res) {
      this.posts[index].liked.push(userId)
    }
  }
  unlike = async (postId, index) => {
    const userId: any = this.user._id;
    let res: any = await this.httpApi.sendPostRequest("/post/unlike", {
      userId,
      postId
    })
    if (res) {
      let uindex = this.posts[index].liked.indexOf(userId);
      this.posts[index].liked.splice(uindex, 1)
    }
  }

  repost = async (post) => {
    const userId: any = this.user._id;
    const postId: any = post._id;
    await this.httpApi.sendPostRequest("/post/repost", {
      userId,
      postId
    })
  }
  private goToPersonal(phoneNumber) {
    this.navCtrl.push(PersonalPage, {
      phoneNumber
    });
  }
}
