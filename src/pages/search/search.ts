import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {PersonalPage} from "../personal/personal";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {SocialSharing} from "@ionic-native/social-sharing";
import {ChatPage} from "../chat/chat";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  posts: any = [];
  private user: any;

  constructor(private storage: Storage,
              public navCtrl: NavController,
              public navParams: NavParams,
              public httpApi: HttpApiProvider,
              public modalCtrl: ModalController
    , private share: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    // this.getItems()
  }

  getItems = async (ev:any) => {
    this.user = await this.storage.get('user')
    const val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      console.log( val.trim())
      let res: any = await this.httpApi.sendPostRequest("/search",{
        query: val
      },null,false)
      if (Array.isArray(res.result[1])) {
        this.posts = res.result[1];
      }
    }
  }
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
  sharePost(post) {
    if(post.file)
      this.share.share(null, post.content,  null,post.file);
    else
      this.share.share(null, post.content, null, null);
  }
}
