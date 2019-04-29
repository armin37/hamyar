import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {VerificationCodePage} from "../pages/verification-code/verification-code";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {PersonalPage} from "../pages/personal/personal";
import { HttpApiProvider } from '../providers/http-api/http-api';
import {SearchPage} from "../pages/search/search";
import {UserInfoPage} from "../pages/user-info/user-info";
import {ChatPage} from "../pages/chat/chat";
import {NewPostPage} from "../pages/new-post/new-post";
import {MentorsPage} from "../pages/mentors/mentors";
import {SafePipe} from "../pipes/safe/safe";
import {Camera,CameraOptions} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    VerificationCodePage,
    PersonalPage,
    SearchPage,
    UserInfoPage,
    ChatPage,
    NewPostPage,
    MentorsPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    VerificationCodePage,
    PersonalPage,
    SearchPage,
    UserInfoPage,
    ChatPage,
    NewPostPage,
    MentorsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'ApiBaseUrl', useValue: "http://5.152.223.102:3010"},
    HttpApiProvider
  ]
})
export class AppModule {
}
