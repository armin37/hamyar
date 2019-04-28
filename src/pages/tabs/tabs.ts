import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SearchPage} from "../search/search";
import {UserInfoPage} from "../user-info/user-info";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;
  tab3Root = SearchPage;
  tab4Root = UserInfoPage;

  constructor() {

  }
}
