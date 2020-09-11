import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../services/notification.service';
import { isNullOrUndefined, isUndefined } from 'util';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;
  show=false;
  sequerityQuestion:any;
 

  streams = [{ id: 1, value: ' AERONAUTICAL ' },
  { id: 2, value: 'MERCHANT NAVY ( FOR MMD/COC EXAMS)' },
  { id: 3, value: 'BSC NAUTICAL SCIENCE ' },
  { id: 4, value: '    BE MARINE ENGINEERING ' }];
  constructor(private authService:AuthService,
    private router:Router,
   public dialogRef: MatDialogRef<SignUpComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.authService.getAllQuestion().subscribe(response=>
        {
          this.sequerityQuestion=response;
          console.log(response.valueOf()+"response data")
        });
      }
  onClear() {
    // let $key = this.userService.form.get('$key').value;
    this.authService.signupform.reset();
    this.authService.initializeFormGroup();
    // this.userService.form.patchValue({ $key });
  }
  showOther()
  {
    if(this.show==false)
    {
      this.show=true
      
    }
    
  }
// this.router.navigate(['/login'])
  onSubmit(registrationData) {
   
    this.authService.userRegistration(registrationData).subscribe(response=>
      {
        this.authService.signupform.reset();
        this.authService.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.onClose();
      });
    }
  
    onClose() {
      this.authService.signupform.reset();
      this.authService.initializeFormGroup();
    
     if(this.dialogRef.componentInstance)
        { this.dialogRef.close();}
    else{
      this.router.navigate(['/login'])
    }
    
    }
  
}
