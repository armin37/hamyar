import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  private user: any={};
  private name: any="";
  private url="";

  constructor(
    public navCtrl: NavController,
     private storage: Storage,
  public navParams: NavParams,
    public sanitizer: DomSanitizer
  ) {

  }
  getSafeUrl(url) {
    this.url=url;
    console.log( url)
    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ionViewDidLoad() {
    this.init();
   // console.log('ionViewDidLoad ChatPage');
  }
  ngOnInit() {
  }
    init=async()=> {
    this.user=await this.storage.get("user")
    this.name=this.navParams.get("name")
    if(this.name!==this.user.name)
      this.getSafeUrl("http://5.152.223.102:2299/demo/index.html?mail="+encodeURI(this.user.name)+"&password="+this.user._id+"&friend="+encodeURI(this.name));
    else
      this.getSafeUrl("http://5.152.223.102:2299/demo/index.html?mail="+encodeURI(this.user.name)+"&password="+this.user._id);
  }
  encodeURI=(str)=>{
    return encodeURI(str);
  }
  closeChat(){
    this.navCtrl.pop();
  }
}
