import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

 
  public tagArray =['php','javascript','java','android','html','python','css','jquery','sql','c','arrays','angularjs'];

  constructor(private http: HttpClient) { }

  httpgettagdata(id:any)
  {
    let params= "",reqUrl=""
     params = 'tag='+this.tagArray[id]
       reqUrl = 'http://localhost:3000/gettagdata?' + params;
      return this.http.get<any[]>(reqUrl, {
          headers: new HttpHeaders({
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          })
      }).pipe(
          map((response: any) => {
            return response
             
          }),
          catchError(err => throwError(err))
        
      );
  }
}
