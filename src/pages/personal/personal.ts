import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpApiProvider} from "../../providers/http-api/http-api";

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
  private user: any={};
  private posts: any=[];
  constructor(
    public navCtrl: NavController,
   public httpApi: HttpApiProvider,
  public navParams: NavParams) {
    this.phoneNumber=navParams.get('phoneNumber');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
    this.getUserProfile();
  }
  getUserProfile=async()=> {
    let res:any=await this.httpApi.sendPostRequest("/profile",{
      phoneNumber:this.phoneNumber
    })
    if(Array.isArray(res)){
      this.user=res[0];
      this.posts=res[1];
    }
  }

}
