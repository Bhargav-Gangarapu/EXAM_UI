import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { retry } from 'rxjs/operators';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StudentExamService {

  baseURL = ''; 
  constructor(private httpClient:HttpClient, private httpClientModule: HttpClientModule) {
    this.baseURL ='https://localhost:44367/api/';
   }
   AuthKey = '';//window.sessionStorage.getItem('auth-token');
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Access-Control-Allow-Origin': '*'
    })
  };

  gethttpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer `+this.AuthKey
    })
  };

  public registerData(stuData) {
    const result: any = this.httpClient.post(`${this.baseURL}UserLogin/registerUser`,stuData, this.httpOptions).pipe(
      retry(0)
    ).toPromise();
    return result;
  }
  public loginData(stuData) {
    const result: any = this.httpClient.post(`${this.baseURL}UserLogin/loginUser`,stuData, this.httpOptions).pipe(
      retry(0)
    ).toPromise();
    return result;
  }
}
