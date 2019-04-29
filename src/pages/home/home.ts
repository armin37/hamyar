import {Component, ViewChild} from '@angular/core';
import {ModalController, Nav, NavController} from 'ionic-angular';
import {PersonalPage} from "../personal/personal";
import {Storage} from "@ionic/storage";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {NewPostPage} from "../new-post/new-post";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any = [];
  user: any;
  nextLink: any = "/post/list/0";

  constructor(public navCtrl: NavController
    , private storage: Storage
    , public httpApi: HttpApiProvider
    , public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.getPostList();
  }

  private goToPersonal(phoneNumber) {
    this.navCtrl.push(PersonalPage, {
      phoneNumber
    });
  }


  getPostList = async () => {
    this.user = await this.storage.get("user");
    console.log(this.nextLink);
    let res: any = await this.httpApi.sendPostRequest(this.nextLink);
    if (Array.isArray(res.post)) {
      this.posts = res.post;
    }
  }

  private addNewPost() {
    const modal = this.modalCtrl.create(NewPostPage);
    modal.present();
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

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.getPostList();
      infiniteScroll.complete();
    }, 500);
  }

  sharePost(post) {

  }
}
