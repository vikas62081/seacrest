import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddStreamComponent } from '../add-stream/add-stream.component';

@Component({
  selector: 'app-admin-stream',
  templateUrl: './admin-stream.component.html',
  styleUrls: ['./admin-stream.component.css']
})
export class AdminStreamComponent implements OnInit {

  constructor(private userService:UserService,
    private notificationService:NotificationService,
    private authService:AuthService,
    private dialog: MatDialog,) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['stramId', 'streamName', 'introduction','actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  searchKey: string;
  streamData:any;
  ngOnInit() {

    this.userService.AllStream();
    setTimeout(()=>
    {
     
    this.streamData=this.userService.getAllStreamData();
   console.log("++++++++++++++++++++++++home"+JSON.stringify(this.streamData))
    
   
        this.listData = new MatTableDataSource(this.streamData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    },500);

    
      
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(streamId:any){
    console.log("enter    "+streamId)
    if(confirm('Are you sure to delete this record ?')){
      
    this.authService.deleteStreamById( streamId);

    this.notificationService.warn('! Deleted successfully');
    }
  }

  onCreate() {
    //this.authService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddStreamComponent,dialogConfig);
  }
 

}
