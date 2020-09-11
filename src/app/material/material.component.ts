import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  link:String;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.link=this.userService.getLink()
  }

}
