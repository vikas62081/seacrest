import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
   streamDataById:any;
   streamId:any;
   show=false;
   subjectDataById:any;
  constructor(public userService:UserService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.streamId=this.route.snapshot.params.streamId;
    this.streamDataById=this.userService.getstreamDataById(this.streamId);
  console.log(JSON.stringify(this.streamDataById))
   //console.log(this.streamDataById+"     data by id  ")
  }
  showMaterialType(subjectName)
  {
   console.log("inside show material"+subjectName)
    for (let subject of this.streamDataById.subjects) {
      // console.log("++++++++++++++++++++"+stream.stramId,streamId);
       if(subject.subjectName==subjectName)
      {
        this.subjectDataById=subject;
        this.show=true;
        break;
      }
       }

  }
  showInfo(materialLink,materialName)
  {
     this.userService.setLink(materialLink);
  // this.router.navigate(['/material/'+materialName])
  this.router.navigate(['/material'])
    // this.router.navigate(['/material'], { queryParams: { materialName: materialName } });
  }

}
