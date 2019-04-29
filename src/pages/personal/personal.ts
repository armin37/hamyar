import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {Storage} from "@ionic/storage";
import {ChatPage} from "../chat/chat";

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
              public navParams: NavParams) {
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
}
