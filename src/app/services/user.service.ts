import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { IfStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  streams:any;
  streamById:any;
  subjectByStreamId:any;
  streamNamewithId:any[]=[];
  materialLink:String;
  users:any;
  subjects:any;
  SubjectWithStream:any[]=[];
  materialWithStream:any[]=[];
  constructor(private http: HttpClient) { }

  getAllUser()
  {
    return this.http.get("http://localhost:8090/authToAdmin/getAlluser")
  }

 addUserInUserData()
 {
   
 }
 //Streams

  AllStream(){
    
    this.http.get("http://localhost:8090/authToAll/getAllStream").subscribe(result=>
    { 
     this.streams=result
    console.log(this.streams)
     for (let stream of this.streams) {
    //  console.log("++++++++++++++++++++"+stream.streamName);
     this.streamNamewithId.push({id:stream.stramId,value:stream.streamName})
   
    }
   // console.log("++++++++++++++++++++user service"+this.streamNamewithId);
  
    });
    //return this.streams;
  }
  getAllStreamData()
  {
    return this.streams
  }

  getStreamNameWithId(){ 
    return  this.streamNamewithId;
  }

  findSubjectWithStream()
  {
   
   
    if(!this.streams)
    {
     this.AllStream();
     setTimeout(()=>
     {
       //console.log("inside if "+this.streams)
       this.findDataForSubjectWithStream();
      //  console.log("inside if "+this.SubjectWithStream)
      //  return this.SubjectWithStream;
     },500);
     
    }
    else{
      this.findDataForSubjectWithStream();
      // return this.SubjectWithStream;
    }
  
  }

  findDataForSubjectWithStream()
  {

    this.streams.forEach(stream => {
      console.log(JSON.stringify(stream))

      if(stream.subjects.length){
        stream.subjects.forEach(subject => {
          this.SubjectWithStream.push({streamId:stream.stramId,streamName:stream.streamName,subjectId:subject.id,subjectName:subject.subjectName})
        });
        
      }
    });

  }

  getSubjectDataWithStream()
  {
    return this.SubjectWithStream
  }

  getstreamDataById(streamId)
  {
    for (let stream of this.streams) {
     // console.log("++++++++++++++++++++"+stream.stramId,streamId);
      if(stream.stramId==streamId)
     {
       return stream;
       break;
     }
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

  // allSubject()
  // {
  //   this.http.get("http://localhost:8090/authToAll/getAllSubject").subscribe(result=>
  //   { 
  //    this.subjects=result
  //    console.log(JSON.stringify(this.subjects)+ " inside auth")
    
  //   });
    
  //   setTimeout(()=>
  //   {
  //   return this.subjects;
  // },500);

  // }

  addStreamByAddingSubject(formData)
{
  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
this.streamById=this.getstreamDataById(formData.stramId)
console.log(this.streamById)
this.streamById.subjects.push(formData.subjects)
console.log("+++++++++++"+this.streamById)
  return this.http.post("http://localhost:8090/authToAdmin/addStream",this.streamById);

}

//material

  
findMaterialWithStream()
{
 
 
  if(!this.streams)
  {
   this.AllStream();
   setTimeout(()=>
   {
     //console.log("inside if "+this.streams)
     this.findDataForMaterialWithStream();
    //  console.log("inside if "+this.SubjectWithStream)
    //  return this.SubjectWithStream;
   },500);
   
  }
  else{
    this.findDataForMaterialWithStream();
    // return this.SubjectWithStream;
  }

}

findDataForMaterialWithStream()
{
  console.log("stream data"+this.streams)

  this.streams.forEach(stream => {
    console.log(JSON.stringify(stream))

    if(stream.subjects.length){
      stream.subjects.forEach(subject => {
        if(subject.materialTypes.length)
        subject.materialTypes.forEach(material => {
          this.materialWithStream.push({streamId:stream.stramId,
                                       streamName:stream.streamName,
                                       subjectId:subject.id,
                                       subjectName:subject.subjectName,
                                       materialId:material.materialId,
                                       materialName:material.materialName,
                                       materialLink:material.materialLink
                                      })
        });
       
      });
      
    }
  });

}

getMaterialDataWithStream()
{
  console.log("material  data"+JSON.stringify(this.materialWithStream))
  return this.materialWithStream
}
getSubjectsByStreamId(stramId)
{
  for (var stream of this.streams) {
    //console.log(stream); 
    if(stream.stramId==stramId){
      this.subjectByStreamId=stream.subjects;
     // console.log("inside if"+JSON.stringify(this.subjectByStreamId))
      break;
    }
  }
  return this.subjectByStreamId;
}

addMaterial(formValue)
{
  let streamData:any;
let streamId=formValue.streamId;
// console.log("stream id"+streamId)
let SubjectId=formValue.subjectId;
// console.log("subject Id"+SubjectId)
streamData=this.getstreamDataById(streamId)
// console.log(JSON.stringify(streamData)+"+++++++STRAT")
let subjects=streamData.subjects;
//console.log("before condition"+JSON.stringify(subjects))
for(var subject of subjects){

  if(subject.id==SubjectId){
    console.log("inside if after condition"+JSON.stringify(subject))
    subject.materialTypes.push({materialName:formValue.materialName,
      materialLink:formValue.materialLink})
      // console.log("before delete"+JSON.stringify(subject))
      //delete subjects['id'];
    // console.log("after delete"+JSON.stringify(subjects))
  //    subjects.push(subject)
  //    console.log("after push"+JSON.stringify(subjects))
     break;
   }
}
// delete streamData['subjects'];
// streamData.subjects=subjects
// console.log(JSON.stringify(streamData)+"+++++++aFTER")
return this.http.post("http://localhost:8090/authToAdmin/addStream",streamData);
}

}