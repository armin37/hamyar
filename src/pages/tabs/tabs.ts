import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SearchPage} from "../search/search";
import {UserInfoPage} from "../user-info/user-info";
import {MentorsPage} from "../mentors/mentors";
import {ChallengePage} from "../challenge/challenge";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChallengePage;
  tab3Root = MentorsPage;
  tab4Root = SearchPage;
  tab5Root = UserInfoPage;

  constructor() {

  }
}
