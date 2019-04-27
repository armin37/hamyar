import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PersonalPage} from "../personal/personal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToPersonal()
  {
    this.navCtrl.push(PersonalPage);
  }
}
