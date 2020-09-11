import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  invalidLogin=false;
  constructor(private authService:AuthService,private router:Router) { }
// data:any={
   
    
//   "username":"nirbh",
  
//   "password": "123456"
 
// }
  ngOnInit() {
   
  }
onSubmit(loginData) {
  console.log(loginData)
     this.authService.login(loginData).subscribe(result=>
      { 
     if(result) {    
         this.router.navigate(['/'])
     }
     else{ 
        
     this.invalidLogin=true
     
     }
      });

     }

}
