import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    URL_API_SPRING = environment.apiUrlSpring;
    URL_API_NODEJS = environment.apiUrlNodeJS;

    constructor(private http: HttpClient) { }//private auth:AuthService
    
    public ApiLoginSpring(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }

        switch (method) {
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
        }        
    }


    public ApiCallSpring(method,endpoint,data,headers):Observable<any>{

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
                return this.http.get(this.URL_API_SPRING + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_SPRING + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallSpringSinSeg(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json"
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API_SPRING + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_SPRING + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_SPRING + endpoint, { headers: headers, params: data });
        }        
    }


    public ApiCallNodeJS(method,endpoint,data,headers):Observable<any>{

        if(headers!=null){
            headers.set("Content-Type","application/json");
        }else{
            headers = new HttpHeaders({
              "Content-Type":"application/json",
            });
        }

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API_NODEJS + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API_NODEJS + endpoint, data, { headers: headers , params : data});
            
            case "PUT":
                return this.http.put(this.URL_API_NODEJS + endpoint, data, { headers: headers , params : data});
            case "DELETE":
            return this.http.delete(this.URL_API_NODEJS + endpoint, { headers: headers, params: data });
        }        
    }

    public ApiCallMultiFormSpring(method,endpoint,data,headers):Observable<any>{

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
           
            case "POST":
                return this.http.post(this.URL_API_SPRING + endpoint, data,headers);
        }        
    }


    getToken(){
        var data = JSON.parse(localStorage.getItem('data'));
        return data["token"];
    }

    // getRefreshToken(){
    //     var data = JSON.parse(localStorage.getItem('data'));
    //     var token=this.parseJwt(data['token']);
    //     var exp=new Date(1000*token.exp);
    
    //     console.log(exp);
    //     console.log(new Date());
    //     if(exp<new Date()){
    //         this.auth.getRefreshToken(data['token']).subscribe(
    //             Response=>{
    //                 console.log("RenovarToken: ",Response);
    //                 data.token=Response.token;
    //                 localStorage.setItem('data',JSON.stringify(data));
    //             },
    //             error=>{
    //               console.log("error: ",error.error);
    //                 console.log(error.error);
    //             }
    //         ); 
    //     }
    
    //     return data["token"];
    //   }
    
    //   parseJwt (token) {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    
    //     return JSON.parse(jsonPayload);
    //   };
}
