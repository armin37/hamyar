import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {Storage} from "@ionic/storage";
import {ChatPage} from "../chat/chat";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  private phoneNumber: any;
  private user: any = {};
  private posts: any = [];
  private suser: any = {};

  constructor(private storage: Storage,
              public navCtrl: NavController,

              public httpApi: HttpApiProvider,
              public navParams: NavParams
    , private share: SocialSharing

  ) {
    this.phoneNumber = navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.suser = await this.storage.get('user')

    let res: any = await this.httpApi.sendPostRequest("/profile", {
      phoneNumber: this.phoneNumber
    })
    if (Array.isArray(res)) {
      this.user = res[0];
      this.posts = res[1];
    }
  }
  mentored: any = false;
  mentoring: any = false;

  goToChat(name) {
    this.navCtrl.push(ChatPage, {name})
  }

  changeMentoredStatus = async () => {
  }

  changeMentoringStatus() {

  }

  setMentorship=async(type, requested, requester)=>{
    let res: any = await this.httpApi.sendPostRequest("/mentorship", {
      type, requester, requested
    })
  }
  sharePost(post) {
    if(post.file)
      this.share.share(null, post.content,  null,post.file);
    else
      this.share.share(null, post.content, null, null);
  }
  like = async (postId, index) => {
    const userId: any = this.suser._id;
    let res: any = await this.httpApi.sendPostRequest("/post/like", {
      userId,
      postId
    })
    if (res) {
      this.posts[index].liked.push(userId)
    }
  }
  unlike = async (postId, index) => {
    const userId: any = this.suser._id;
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
    const userId: any = this.suser._id;
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
