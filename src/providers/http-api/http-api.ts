import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {RequestOptions} from "@angular/http";

/*
  Generated class for the HttpApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpApiProvider {
  private headers: HttpHeaders
  constructor(
    private http: HttpClient
    , @Inject('ApiBaseUrl') private apiBaseUrl: string
    , private loadingCtrl: LoadingController
    , private storage: Storage
  ) {
     this.headers= new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  sendPostRequest=async(url,body={},headers=null,load=true)=>{
    let loading = this.loadingCtrl.create({
      content: ''
    });
    if(load)
    loading.present();
    if(!headers){
      headers=this.headers;
    }
    let user:any=await this.storage.get('user');
    if(user){
      headers['Authorization']='JWT '+user.token;
    }
    try{
      let res=await this.http.post(this.apiBaseUrl.concat(url),
        body,
        {
          headers: headers
        }).toPromise()
      loading.dismiss();
      console.log(url,body,headers,res)
      return res;
    }catch (err){
      loading.dismiss();
      console.log(url,body,headers,err)
      alert("خطا!"+"\r\n"+err['error']['message']);
      return null;
    }

  }
  sendImageRequest=async(url,body={},headers=null)=>{
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();
    if(!headers){
      headers=this.headers;
    }else {
      headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'multipart/form-data');
    }

    let user:any=await this.storage.get('user');
    if(user){
      headers['Authorization']='JWT '+user.token;
    }
    try{
      let res=await this.http.post(this.apiBaseUrl.concat(url),
        body,
        {
          headers: headers
        }).toPromise()
      loading.dismiss();
      console.log(url,body,headers,res)
      return res;
    }catch (err){
      loading.dismiss();
      console.log(url,body,headers,err)
      alert("خطا!"+"\r\n"+err['error']['message']);
      return null;
    }

  }

}
