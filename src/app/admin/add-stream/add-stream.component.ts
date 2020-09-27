import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
// import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent  {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  folder:String='stream'
  formTemplate = new FormGroup({
    streamName: new FormControl('', Validators.required),
    Introduction: new FormControl('',Validators.required),
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private storage: AngularFireStorage, private userService:UserService,
    public dialogRef: MatDialogRef<AddStreamComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // this.authService.getImageDetailList();
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/imgages/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `stream/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            console.log(formValue)
            //this.authService.addStream(formValue);
       
            this.userService.addStream(formValue)
                
                this.formTemplate.reset();
                this.notificationService.success(':: Submitted successfully');
                this.onClose();
             


            ///
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

 


  onClose() {
    this.resetForm();
    // this.authService.initializeFormGroup();
    this.dialogRef.close();
 }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      streamName: '',
      imageUrl: '',
      Introduction: ''
    });
    this.imgSrc = 'assets/images/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

 }