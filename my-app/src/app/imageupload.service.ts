import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';

@Injectable()
export class ImageuploadService {
  _baseUrl : string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

 /* upload(files, parameters){
    let headers = new Headers();
    let options = new HttpRequest({headers: headers});
  }*/

  createAuthHeader(){
    var headers = new HttpHeaders();
    headers.append("Authoriztion", 'Token asdasd');

    return headers;
  }


}
