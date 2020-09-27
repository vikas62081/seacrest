import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  imgSrc: string;
  streams:any;
  selectedImage: any = null;
  isSubmitted: boolean;
  folder:String='stream'
  selectedLevel;
  subjectByStreamId:any;
  formTemplate = new FormGroup({
    streamId: new FormControl('', Validators.required),
    subjectId: new FormControl('', Validators.required),
    materialName: new FormControl('',Validators.required),
    materialUrl: new FormControl('', Validators.required)
  })

  constructor(private storage: AngularFireStorage, private authService: AuthService,
    private userService:UserService,
    public dialogRef: MatDialogRef<AddMaterialComponent>,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.streams=this.userService.streams;
    console.log("stream value")
    console.log(this.streams)
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
    console.log("hiiiiiiiiiiii"+JSON.stringify(formValue))
    if (this.formTemplate.valid) {
      var filePath = `material/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['materialLink'] = url;
            console.log(formValue)
            //this.authService.addStream(formValue);
       
            this.userService.addMaterial(formValue)
                this.formTemplate.reset();
                //this.authService.initializeFormGroup();
                this.notificationService.success(':: Submitted successfully');
                this.onClose();
              


           
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }

  onClose() {
    this.authService.signupform.reset();
    this.authService.initializeFormGroup();
    this.dialogRef.close();
 }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      streamId: '',
      subjectId: '',
      materialName: '',
      materialUrl: ''
      
    });
    this.imgSrc = 'assets/images/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  selected(){
    // console.log(this.selectedLevel)
    let streamId=this.selectedLevel;
    
    this.subjectByStreamId=this.userService.getSubjectsByStreamId(streamId)
    console.log(this.subjectByStreamId)
    
  }
 }