import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpComponent } from 'src/app/sign-up/sign-up.component';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { timeInterval } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  userdata:any;
  
  constructor(private userservice:UserService,
    private authService:AuthService, 
    private dialog: MatDialog,
    private notificationService:NotificationService) { }
  //getAllUser
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['emailId', 'phoneNo', 'stream', 'rank', 'name', 'isAdmin','actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    // setInterval(()=>{ 
    this.userservice.getAllUser().subscribe(
      list => {
        console.log(JSON.stringify(list))
        this.userdata=list
        // let array = list.map(item => {
        //   let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
        //   return {
        //     $key: item.key,
        //     departmentName,
        //     ...item.payload.val()
        //   };
        // });
        this.listData = new MatTableDataSource(this.userdata);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //   });
        // };
      });
      // },5000);
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.authService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "90%";
    this.dialog.open(SignUpComponent,dialogConfig);
  }

  onEdit(row){
   this.authService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignUpComponent,dialogConfig);
  }

  onDelete(emailId:String){
    console.log("enter    "+emailId)
    if(confirm('Are you sure to delete this record ?')){
      
    this.authService.deleteEmployee( emailId);

    this.notificationService.warn('! Deleted successfully');
    }
  }
}
