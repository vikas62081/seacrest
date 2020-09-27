import { Injectable, ɵConsole } from '@angular/core';
import { FormGroup, FormControl,Validators} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import * as _ from 'lodash';
//import { map } from 'rxjs/internal/operators/map';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// import { Stream } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  streamDetailList: AngularFireList<any>;
  
  
  
  constructor(private http: HttpClient,private firebase: AngularFireDatabase) { }

  signupform: FormGroup = new FormGroup({
    // $key: new FormControl(null),
    stream: new FormControl('1'),
    name: new FormControl('',Validators.required),
    emailId: new FormControl('',[Validators.email,Validators.required]),
    phoneNo: new FormControl('',[Validators.required]),
    rank: new FormControl(''),
    companyName: new FormControl(''),
    cdcNo: new FormControl(''),
    examGrade: new FormControl(''),
    dob: new FormControl(''),
    city: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    reEnterPassword: new FormControl('',Validators.required),
    securityQuestionId: new FormControl(''),
    securityAnswer: new FormControl(''),
  });

  initializeFormGroup() {
    this.signupform.setValue({
      // $key: null, 
      stream:'1',
      name: '',
      emailId: '',
      phoneNo: '',
      rank:'',
      companyName:'',
      cdcNo:'',
      examGrade:'',
      dob:'',
      city: '',
      country:'',
      password:'',
      reEnterPassword:'',
      securityQuestionId:'',
      securityAnswer:''
    });
  }

  userRegistration(registrationData){
   console.log(registrationData)
    return this.http.post("http://localhost:8090/authToAll/addUser",registrationData);
  }
 getAllQuestion(){
    return this.http.get("http://localhost:8090/authToAll/getAllQuestion");
  }

  //login part
  
  loginform: FormGroup = new FormGroup({
   
    emailId: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
   
  });

  login(loginData){
    try {
      console.log(loginData)
      return this.http.post("http://localhost:8090/authToAll/signin",loginData)
      .pipe(map(Response=>{
         
       if(Response && Response['token']){
         localStorage.setItem('token',Response['token']);
         return true;
       }
       else{
         
        return false;
      }
      }));
      
    } catch (error) {

    }
   
  }
  logout()
  {
    localStorage.removeItem('token');
  }

  isLoggedIn()
  {
   // return tokenNotExpired();
  
   let token = localStorage.getItem('token');
   let jwtHelper = new JwtHelperService();
   // Check if the token is expired and return true or false
  //  console.log("hiiiiii+++++++++++")
   return jwtHelper.isTokenExpired(token);
   
  }

  //stream addsition part
  // addStream(formValue)
  // {
    
  //   return this.http.post("http://localhost:8090/authToAdmin/addStream",formValue);
  // }

  getstreamDetailList() {
    this.streamDetailList = this.firebase.list('streamDetails');
    
    // console.log("inside getImageDetailList "+JSON.stringify(this.streamDetailList))
    // return this.streamDetailList
  }

 
 

  populateForm(row){
    console.log("row data"+JSON.stringify(row))
    row.reEnterPassword=row.password
    
    //row.sequerityQuestion=''
    console.log("row data"+JSON.stringify(row))
   // this.signupform.setValue(_.omit(row,'reEnterPassword'));
  this.signupform.setValue(row);
  }

  deleteEmployee(email:String){
    //let obj={"emailId":emailId,"password":""};
    //console.log("jkdhjdhdg"+logindata)

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        emailId:email 
    
      },
    };
    
    this.http
      .delete('http://localhost:8090/authToAdmin/deleteUserById', options)
      .subscribe( );
  
 
     //this.http.delete("http://localhost:8090/authToAdmin/deleteUserById",{subject:emailId}).subscribe();
  }

  deleteStreamById(streamId)
  {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        stramId:streamId,
        streamName:"NMBCHB"
    
      },
    };
    
    this.http
      .delete('http://localhost:8090/authToAdmin/deleteStreamById', options)
      .subscribe( );

  }

  // getImageDetailList() {
  //   this.imageDetailList = this.firebase.list('imageDetails');
  // }

  // insertImageDetails(imageDetails) {
  //   this.imageDetailList.push(imageDetails);
  // }

  //subjects
  addSubject(formValue)
  {
    return this.http.post("http://localhost:8090/authToAdmin/addSubject",formValue);
  }

  deleteSubjectById(Id) {
  console.log("inside auth service "+Id)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        subjectId:Id,
        
    
      },
    };
    
    this.http
      .delete('http://localhost:8090/authToAdmin/deleteSubjectById', options)
      .subscribe( );

  }
  deleteMaterialById(Id) {
    console.log("inside auth service "+Id)
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          materialId:Id,
          
      
        },
      };
      
      this.http
        .delete('http://localhost:8090/authToAdmin/deleteMaterialById', options)
        .subscribe( );
  
    }

    //Question

  

}





