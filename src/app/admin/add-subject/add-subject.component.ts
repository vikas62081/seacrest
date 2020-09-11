import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  streams:any[]=[];
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  folder:String='stream'
  formTemplate = new FormGroup({
    subjectName: new FormControl('', Validators.required),
    streamId: new FormControl('',Validators.required),
    // imageUrl: new FormControl('', Validators.required)
  })

  constructor(private storage: AngularFireStorage, private userService: UserService,
    
    public dialogRef: MatDialogRef<AddSubjectComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
   this.streams= this.userService.getStreamNameWithId();
   console.log(this.streams)
    this.resetForm();
  }


  onSubmit(formValue) {
    
    // this.isSubmitted=true
   console.log(JSON.stringify(formValue.streamId)+"++++++++++++++")
 
  //  console.log(formValue.streamId['streamName'])
     let formData={stramId:formValue.streamId,
      subjects:{subjectName:formValue.subjectName}}
      console.log(JSON.stringify(formData))
      
            this.userService.addStreamByAddingSubject(formData).subscribe(response=>
              {
                this.formTemplate.reset();
                //this.authService.initializeFormGroup();
                this.notificationService.success(':: Submitted successfully');
                this.onClose();
              });

 
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
      subjectName: '',
      
      streamId: ''
    });
    
    // this.isSubmitted = false;
  }

 }