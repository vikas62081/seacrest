import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  streamNamewithId:any;
  // streams = [{ id: 1, value: ' AERONAUTICAL ' },
  // { id: 2, value: 'MERCHANT NAVY ' },
  // { id: 3, value: 'BSC NAUTICAL SCIENCE ' },
  // { id: 4, value: 'BE MARINE ENGINEERING ' }];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.AllStream();
    setTimeout(()=>
    {
     
    this.streamNamewithId=this.userService.streams;
   console.log("++++++++++++++++++++++++home"+JSON.stringify(this.streamNamewithId))
    },100);
    
  //this.userService.getStreamNameWithId();
  }

}
