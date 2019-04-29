import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  constructor(public navCtrl: NavController,
              storage: Storage) {
    storage.ready().then(async () => {
      let user: any = await storage.get("user");
      if (user)
        this.navCtrl.setRoot(TabsPage);
      else
        this.navCtrl.setRoot(SignupPage);
    });
  }

}
