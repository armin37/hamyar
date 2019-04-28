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

  constructor(
    public navCtrl: NavController
    , private storage: Storage
    , public httpApi: HttpApiProvider
    , public modalCtrl: ModalController
  ) {

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
    let res: any = await this.httpApi.sendPostRequest("/post/list")
    if (Array.isArray(res)) {
      this.posts = res;
    }
  }

  private addNewPost() {
    const modal = this.modalCtrl.create(NewPostPage);
    modal.present();
  }
}
