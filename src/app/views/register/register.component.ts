import { Component } from '@angular/core';

import {Myclass } from '../../myclass';
import { DataService } from '../../data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 p_ar="Hello";

  myfbclass={
    "color": "red"
  }
  myclass:Myclass[];

  constructor(private storedata:DataService) { }
  model: any = {};

  temp_area;
  temp_flat;
  temp_app_name;
  temp_ladmark;
  temp_city;
  temp_state;
  temp_contact_no;
  temp_email;
  allselect(p_area,p_flat,p_app_name,p_ladmark,p_city,p_state,p_contact_no,p_email)
  {

      this.temp_area= p_area.value;
      this.temp_flat = p_flat.value;
      this.temp_app_name =p_app_name.value;
      this.temp_ladmark=p_ladmark.value;
      this.temp_city= p_city.value;
      this.temp_state= p_state.value;
      this.temp_contact_no= p_contact_no.value;
      this.temp_email= p_email.value;
   }
   onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
  }
  user_type="";
  
  savedata(usertype,fname,username,email,password,confirmPassword,client_name,mobno,occupation,p_area,p_flat,p_app_name,p_ladmark,p_city,
    p_state,p_contact_no,p_email,c_area,c_flatno,c_app_name,c_ladmark,c_city,c_state,c_contact_no,c_email,factory_name,factory_owner,factory_prod,f_city,f_phone,f_email)
    {
      // console.log(usertype.value);
      
    var myclassobj = {
      user_type: this.user_type,
       first_name : fname.value ,
       user_name :username.value,
       user_email : email.value ,
       user_pass : password.value ,
       user_rep_pass :confirmPassword.value,
       client_name : client_name.value,
       mobile_no : mobno.value,
        occupation : occupation.value,
      p_area : p_area.value,
      p_plot_no : p_flat.value,
      p_app_name : p_app_name.value,
      p_landmark : p_ladmark.value,
      p_city  : p_city.value,
      p_state  : p_state.value,
      p_contact_no  : p_contact_no.value,
      p_email : p_email.value,
      c_area  : c_area.value,
      c_plot_no : c_flatno.value,
      c_app_name : c_app_name.value,
      c_landmark  : c_ladmark.value,
     c_city  : c_city.value,
      c_state   : c_state.value,
       c_contact_no  : c_contact_no.value,
       c_email  : c_email.value,
       factory_name  : factory_name.value,
      factory_owner  : factory_owner.value,
      factory_prod  : factory_prod.value,
      f_city : f_city.value,
      f_phone : f_phone.value,
      f_email  : f_email.value
    };

      var res = this.storedata.savedata(myclassobj).subscribe(res=>this.myclass = res) ;

      if(res){
        window.location.href = "/#/login";
      }
      else{

      }
     }
     showval(x){
       this.user_type = x.target.value;
       alert(x.target.value);
     }
     select_user_type: string[] = ['Consignee', 'Consigner'];
     default: string = 'Consignee';
     select_user_typeForm: FormGroup;

}
