import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PersonalPage} from "../personal/personal";
import {Storage} from "@ionic/storage";
import {HttpApiProvider} from "../../providers/http-api/http-api";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts:any=[];
  constructor(
    public navCtrl: NavController
    , private storage: Storage
    , public httpApi: HttpApiProvider
  ) {

  }
  ionViewDidLoad() {
    this.getPostList();
  }

  public goToPersonal(phoneNumber){
    this.navCtrl.push(PersonalPage,{
      phoneNumber
    });
  }

  getPostList=async()=> {
    let res:any=await this.httpApi.sendPostRequest("/post/list")
    if(Array.isArray(res)){
      this.posts=res;
    }
  }
}
