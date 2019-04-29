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
    // this.getItems()
  }
  private goToPersonal(phoneNumber) {
    this.navCtrl.push(PersonalPage, {
      phoneNumber
    });
  }

  getItems = async (ev:any) => {
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
}
