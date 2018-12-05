import { Myclass } from './myclass';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable,  of as observableOf } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public myurl='/api';
  public isauth:boolean=false;
  public fetcheddata ={};

  constructor(private http : HttpClient) { }

  checkauth(authmodel): Observable<boolean>{    
    this.http.post(this.myurl,authmodel).subscribe(res=>{
      if(res==null){
        this.isauth=false;
        console.log("Subscribe returned : "+ this.isauth);
      }
      else if(res!=null){
        this.fetcheddata = res;
        this.isauth=true;
        console.log("Subscribe returned : "+ this.isauth);
      }
    });
    return observableOf(this.isauth);
  }
  getobj(){
    return this.fetcheddata;
  }
  savedata(myclobj):Observable<Myclass[]> {
    console.log('service ' + myclobj.usertype + myclobj.first_name);
    return this.http.post<Myclass[]>(this.myurl,myclobj).pipe(map(res=>res));
 }
 logincheck(myclobj):Observable<Myclass[]> {
   console.log(myclobj);
  return this.http.get<Myclass[]>(this.myurl+'/'+myclobj).pipe(map(res=>res));
 }
}
