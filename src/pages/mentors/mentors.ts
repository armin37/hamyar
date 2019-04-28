import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HttpApiProvider} from "../../providers/http-api/http-api";
import {VerificationCodePage} from "../verification-code/verification-code";
import {PersonalPage} from "../personal/personal";

/**
 * Generated class for the MentorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mentors',
  templateUrl: 'mentors.html',
})
export class MentorsPage {
  private mentored: any=[];
  private mentoring: any=[];

  constructor(
    public navCtrl: NavController
    , public httpApi: HttpApiProvider
    , private storage: Storage,
  public navParams: NavParams) {
    this.getMentors();
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MentorsPage');
  }
  private goToPersonal(phoneNumber) {
    this.navCtrl.push(PersonalPage, {
      phoneNumber
    });
  }
  getMentors=async()=>{
      let res:any=await this.httpApi.sendPostRequest("/mentors")
      if((res)){
        this.mentored=res['mentored'];
        this.mentoring=res['mentoring'];

      }
  }

}
