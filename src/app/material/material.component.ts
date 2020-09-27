import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  link:String;
  //pdfsrc:any;
  constructor(public userService:UserService) { }
  // pdfsrc="https://firebasestorage.googleapis.com/v0/b/seacrest-afd9e.appspot.com/o/material%2FBY%20SEACREST%20%E2%84%A2%20-%20%20BRIDE%20PROCEDURE%20GUIDE%2C%20IMP%20EXTRACTS%20(3)_1599875648992?alt=media&token=e5ddcbe5-7f0a-404e-a3ce-428e485eeee3"
  ngOnInit() {
     this.link=this.userService.getLink()
    //  this.pdfsrc='https://firebasestorage.googleapis.com/v0/b/seacrest-afd9e.appspot.com/o/material%2FBY%20SEACREST%20%E2%84%A2%20-%20%20BRIDE%20PROCEDURE%20GUIDE%2C%20IMP%20EXTRACTS%20(3)_1599875648992?alt=media&token=e5ddcbe5-7f0a-404e-a3ce-428e485eeee3'
    //this.link='https://firebasestorage.googleapis.com/v0/b/seacrest-afd9e.appspot.com/o/material%2FBY%20SEACREST%20%E2%84%A2%20-%20%20BRIDE%20PROCEDURE%20GUIDE%2C%20IMP%20EXTRACTS%20(3)_1599875648992?alt=media&token=e5ddcbe5-7f0a-404e-a3ce-428e485eeee3'

    
  }

}
