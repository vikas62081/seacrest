import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddquestionComponent } from '../addquestion/addquestion.component';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public userService:UserService,
    private notificationService:NotificationService,
    
    private dialog: MatDialog) { 
      this.userService.getAllquestion()
    }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['questionId','questionName','actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  searchKey: string;
 securityQuestion:any;
 questionWithId:any[]=[]
  ngOnInit() {
    

    
    setTimeout(()=>
    {
    this.securityQuestion= this.userService.questions
    this.securityQuestion.forEach(question => {
      this.questionWithId.push({questionId:question.key,questionName:question.payload.val().securityQuestionName})
    });
    console.log( this.questionWithId)
    
    this.listData = new MatTableDataSource(this.questionWithId);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    },3000);

  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

 
  onCreate() {
   // this.authService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //  dialogConfig.height="40%";
    this.dialog.open(AddquestionComponent,dialogConfig);
  }

  onEdit(somevalue)
  {}
 

 

}
