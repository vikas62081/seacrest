import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { IfStmt } from '@angular/compiler';
import { AuthService } from './auth.service';
import { Stream } from '../model/Stream';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NotificationService } from './notification.service';
import { Key } from 'protractor';
import { Subject } from '../model/Subject';
import { Material } from '../model/Material';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  streamDetailList: AngularFireList<any>;
  private streamFormData:Stream;
  streams:any[];
  streamById:Stream;
  subjectByStreamId:any;
  streamNamewithId:any[]=[];
  materialLink:String;
  users:any;
  subjects:any;
  SubjectWithStream:any[];
  materialWithStream:any[];
  questions:any;
  questionList: AngularFireList<any>;
  constructor(private http: HttpClient,
    private firebase: AngularFireDatabase,
    private notificationService:NotificationService) { }

  getAllUser()
  {
    return this.http.get("http://localhost:8090/authToAdmin/getAlluser")
  }

 
                        ////////////////////////
                        // start of stream 
                        ///////////////////////
                   

  AllStream(){
    this.streams=[]
    this.streamDetailList=this.firebase.list('/streamDetails')
   // console.log(this.streamDetailList.snapshotChanges())
   
    this.streamDetailList.snapshotChanges().subscribe(
      list => {
        console.log("streams value")
      console.log( this.streams)
        for(let stream of list )
        {
        // console.log("key value"+JSON.stringify(stream.payload.val()))
        this.streams.push({id:stream.key,
          Introduction:stream.payload.val().Introduction,
          imageUrl:stream.payload.val().imageUrl,
          streamName:stream.payload.val().streamName,
           subjects:stream.payload.val().subjects,
           materialType:stream.payload.val().materialType
        })
        }
        // console.log("inside all stream")
        
        });
        
     
 
    }

    getstreamDataById(streamId)
    {
      for (let stream of this.streams) {
      
        if(stream.id==streamId)
       {
         return stream;
        
       }
        }
       
    }

    addStream(formData)
{
 this.streamFormData=new Stream();
 
  this.streamFormData.streamName=formData.streamName;
  this.streamFormData.Introduction=formData.Introduction;
  this.streamFormData.imageUrl=formData.imageUrl;
 
  
  this.streamDetailList.push(this.streamFormData);
 }

 DeleteStream($key: string) {
   console.log($key)
  if(confirm('Are you sure to delete this record ?')){
    
    this.streamDetailList.remove($key);

    this.notificationService.warn('! Deleted successfully');
    }
}

                        ////////////////////////
                        // End of stream 
                        ///////////////////////



                         ////////////////////////
                        // start of subject 
                        ///////////////////////

  findSubjectWithStream()
  {
   
   
    if(!this.streams.length)
    {
   
     this.AllStream();
     setTimeout(()=>
     {
      //  console.log("inside if "+JSON.stringify(this.streams))
       this.findDataForSubjectWithStream();
       console.log("inside if this.SubjectWithStream"+JSON.stringify(this.SubjectWithStream))
      //  return this.SubjectWithStream;
     },3000);
     
    }
    else{
      console.log("3")
      this.findDataForSubjectWithStream();
      // return this.SubjectWithStream;
    }
  
  }

  findDataForSubjectWithStream()
  {
  // console.log(this.streams)
  this.SubjectWithStream=[]
    this.streams.forEach(stream => {
     console.log("inside subject"+JSON.stringify(stream))

      if(stream.subjects){
        stream.subjects.forEach((subject,index) => {
          this.SubjectWithStream.push({streamId:stream.id,streamName:stream.streamName,subjectId:index,subjectName:subject.subjectName})
        });
        
      }
    });

  }

 
 addSubject(formData)
{
//  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"+formData.subjects.subjectName)
  
this.streamById=this.getstreamDataById(formData.stramId)
console.log("formData  "+formData+ " streamById  "+this.streamById)
if(!this.streamById.subjects){
  var subject:Subject;
  subject=new Subject();
  subject.subjectName=formData.subjects.subjectName; 
  this.streamById.subjects=[]
  this.streamById.subjects.push(subject);
}
else{
  var subject:Subject;
  subject=new Subject();
  subject.subjectName=formData.subjects.subjectName; 
  
  this.streamById.subjects.push(subject);
}

  // console.log(this.streamById)

  this.streamDetailList.update( formData.stramId,
    {
      // Introduction: this.streamById.Introduction,
      // imageUrl: this.streamById.imageUrl,
      // streamName: this.streamById.streamName,
      subjects:this.streamById.subjects
    });

}



getSubjectsByStreamId(stramId)
{
  for (var stream of this.streams) {
    //console.log(stream); 
    if(stream.id==stramId){
      this.subjectByStreamId=stream.subjects;
    console.log("inside if subject"+JSON.stringify(this.subjectByStreamId))
      break;
    }
  }
  return this.subjectByStreamId;
}


DeleteSubject(rowdata){
 
  let StreamData=this.getstreamDataById(rowdata.streamId)
  console.log(StreamData)
  let subjects=StreamData.subjects
  let i=0;
  for(let subject of subjects)
  {
    
    
   
    if(i==rowdata.subjectId)
    {
      
      console.log(StreamData.subjects[i]) 
      delete StreamData.subjects[i];
      console.log(StreamData.subjects)
      break
    }
    i=i+1;

  }
  if(confirm('Are you sure to delete this record ?')){
    this.streamDetailList.set( rowdata.streamId,
      {
        
        subjects:StreamData.subjects
      });
      this.notificationService.warn('! Deleted successfully');
  }
 
  
}


 
  
                        ////////////////////////
                        // End of subject
                        ///////////////////////



                         ////////////////////////
                        // start of material
                        ///////////////////////

  
findMaterialWithStream()
{
 
 
  if(!this.streams)
  {
   this.AllStream();
   setTimeout(()=>
   {
    console.log("inside if "+JSON.stringify(this.streams))
     this.findDataForMaterialWithStream();
    console.log("inside if "+JSON.stringify(this.materialWithStream))
    //  return this.SubjectWithStream;
   },3000);
   
  }
  else{
    console.log("inside else")
    this.findDataForMaterialWithStream();
    // return this.SubjectWithStream;
  }

}

findDataForMaterialWithStream()
{
   
   this.materialWithStream=[]
  this.streams.forEach(stream => {
    // console.log(stream)

    if(stream.subjects){
      stream.subjects.forEach((subject,subjectIndex) => {
        // console.log(subject)
        if(subject.materialTypes)
        subject.materialTypes.forEach((material,materialIndex) => {
          this.materialWithStream.push({streamId:stream.id,
                                       streamName:stream.streamName,
                                       subjectId:subjectIndex,
                                       subjectName:subject.subjectName,
                                       materialId:materialIndex,
                                       materialName:material.materialName,
                                       materialLink:material.materialUrl
                                      })
        });
       
      });
      
    }
  });

}


addMaterial(formValue)
 {
   console.log(formValue)
  let streamData:any;
let streamId=formValue.streamId;
// console.log("stream id"+streamId)
let SubjectId=formValue.subjectId;
// console.log("subject Id"+SubjectId)
streamData=this.getstreamDataById(streamId)
console.log(JSON.stringify(streamData)+"+++++++STRAT")
let subjects=streamData.subjects;
console.log(subjects)
let i=0;
for(var subject of streamData.subjects){
  console.log(subject)
  if(SubjectId==i)
  {
    
    
      var material:Material;
      material=new Material();
      material.materialName=formValue.materialName; 
      material.materialUrl=formValue.materialLink; 
     //subject.materialTypes=[]
    //  this.streamById.subjects.push(subject);
    subject.materialTypes.push(material);
    console.log("stream with subject")
    console.log(streamData.subjects)
    this.streamDetailList.update( streamId,
      {
        
        subjects:streamData.subjects
      });
    break
  }
  else{i+=1;}
  
 

 }
}

setLink(materialLink)
{
  this.materialLink=materialLink;
}
getLink()
{
  return this.materialLink;
}


                        ////////////////////////
                        // End of Material
                        ///////////////////////



                         ////////////////////////
                        // Start of Question
                        ///////////////////////




getAllquestion()
{
  this.questionList=this.firebase.list('questionDetails');

  this.questionList.snapshotChanges().subscribe(
    list => {
    console.log(list)
    this.questions=list;
      
      });
      

}

addQuestion(formData)
{
  console.log(formData)
  this.questionList.push(formData);
}

deletequestionById(quistionId:any){
  console.log("enter    "+quistionId)
  if(confirm('Are you sure to delete this record ?')){
    
    this.questionList.remove(quistionId);

  this.notificationService.warn('! Deleted successfully');
  }
}

                        ////////////////////////
                        // End of Question
                        ///////////////////////



}