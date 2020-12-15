import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    URL_API = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    public ApiLogin(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }

        switch (method) {
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data});
        }        
    }


    public ApiCallConToken(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
            headers.set("Authorization","Bearer " + this.getToken());
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
              "Authorization":"Bearer " + this.getToken()
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallSinToken(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallMultiFormSinToken(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type:","multipart/form-data")
        }else{
            headers = new HttpHeaders({
              "Content-Type:":"multipart/form-data",
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers });
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }        
    }


    getToken(){
        var data = JSON.parse(localStorage.getItem('data'));
        return data["token"];
      }
}
