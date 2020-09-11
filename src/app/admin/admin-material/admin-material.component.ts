import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AddMaterialComponent } from '../add-material/add-material.component';

@Component({
  selector: 'app-admin-material',
  templateUrl: './admin-material.component.html',
  styleUrls: ['./admin-material.component.css']
})
export class AdminMaterialComponent implements OnInit {
  constructor(private userService:UserService,
    private notificationService:NotificationService,
    private authService:AuthService,
    private dialog: MatDialog,) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['materialId', 'materialName','subjectName','streamName','actions'];
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  searchKey: string;
  materialData:any;
  subjects:any;
  SubjectData:any;
  ngOnInit() {
    this.userService.findMaterialWithStream();
   
   setTimeout(()=>
     {
      
   this.materialData=this.userService.getMaterialDataWithStream();
   
    
   
        this.listData = new MatTableDataSource(this.materialData);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    },1000);

    
      
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete(materialId:any){
    console.log("enter    "+materialId)
    if(confirm('Are you sure to delete this record ?')){
      
    this.authService.deleteMaterialById(materialId);

    this.notificationService.warn('! Deleted successfully');
    }
  }

  onCreate() {
   // this.authService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //  dialogConfig.height="40%";
    this.dialog.open(AddMaterialComponent,dialogConfig);
  }
 

}
