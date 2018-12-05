import {Component, SecurityContext, OnInit} from '@angular/core';
import { DataService } from '../../data.service';


@Component({
  templateUrl: 'profile.component.html'
})

export class ProfileModule implements OnInit { 
  public localobj={};
  constructor(private dataobj:DataService){ }
  ngOnInit(){
    this.localobj = this.dataobj.getobj();
    console.log(this.localobj);
  }
}
