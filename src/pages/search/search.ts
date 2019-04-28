import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {PersonalPage} from "../personal/personal";
import {HttpApiProvider} from "../../providers/http-api/http-api";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpApi: HttpApiProvider,
              public modalCtrl: ModalController) {
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
}
