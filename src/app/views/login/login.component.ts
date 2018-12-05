import { Component } from '@angular/core';
import {Myclass } from '../../myclass';
import { DataService } from '../../data.service';
import { AuthModel } from './authmodel';
import { interval  } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public myModal;
  public authmodel = new AuthModel();
  public isauth:boolean=false;

  myclass:Myclass[];
  constructor(private dataservice : DataService) { }

  model: any = {};

checkauth(){
  alert("Authenticating... " + this.authmodel.user_name);
  var res = this.dataservice.checkauth(this.authmodel).toPromise().then(dt=> this.isauth=dt);
  if(this.isauth){
    alert("Login Successfull... Please Wait redirecting to dashboard");
    window.location.href = "/#/dashboard";
  }
  else{
    alert("Invalid login Password");
  }
}


  logincheck(username,Password)
  {
    var myclassobj = {
      user_name : username.value,
     user_pass : Password.value };
     var res=  this.dataservice.logincheck(myclassobj).subscribe( res=>this.myclass = res);

     if (res){
      window.location.href = "/#/dashboard";
     }
     else{
      alert('wrong pass');
     }
  }
}
