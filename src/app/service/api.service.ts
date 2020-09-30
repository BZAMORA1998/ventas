import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    URL_API = environment.apiUrl;

    constructor(private http: HttpClient) { }
    
    public ApiCall(method,endpoint,data,headers):Observable<any>{{

        headers.set("Content-Type","application/json");

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
    }
}
