import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {


 
  isSubmitted: boolean;
 
  
  formTemplate = new FormGroup({
    securityQuestionName: new FormControl('', Validators.required),
  
  })

  constructor(
     private userService: UserService,
 public dialogRef: MatDialogRef<AddquestionComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
  
    this.resetForm();
  }


  onSubmit(formValue) {
    
   
    
     
            this.userService.addQuestion(formValue)
                this.formTemplate.reset();
                //this.authService.initializeFormGroup();
                this.notificationService.success(':: Submitted successfully');
                this.onClose();
             

 
  }

  onClose() {
    this.formTemplate.reset();
   // this.formTemplate.initializeFormGroup();
    this.dialogRef.close();
 }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      securityQuestionName: '',
     
    });
    
    
  }

 }