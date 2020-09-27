import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatListModule} from '@angular/material/list';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import  { ReactiveFormsModule,FormsModule } from '@angular/forms';
// import { MaterialModule } from './material/material.module';
// import {PdfViewerModule} from 'ng2-pdf-viewer'
import {MatButtonModule,MatCheckboxModule,MatInputModule,
  MatFormFieldModule,MatRadioModule,MatNativeDateModule,
  MatDatepickerModule,MatSelectModule,MatGridListModule, MatIconModule,
  MatCardModule,MatSidenavModule,MatToolbarModule,MatDividerModule,
  MatSnackBarModule,MatTableModule,MatDialogModule,MatSortModule,
  MatPaginatorModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthService } from './services/auth.service';
import { StreamComponent } from './stream/stream.component';

import { MaterialComponent } from './material/material.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminStreamComponent } from './admin/admin-stream/admin-stream.component';
import { AddStreamComponent } from './admin/add-stream/add-stream.component';
import { environment } from "../environments/environment";
import { SubjectComponent } from './admin/subject/subject.component';
import { AddSubjectComponent } from './admin/add-subject/add-subject.component';
import { AddMaterialComponent } from './admin/add-material/add-material.component';
import { AdminMaterialComponent } from './admin/admin-material/admin-material.component';
import { QuestionComponent } from './admin/question/question.component';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatTableModule} from '@angular/material/table';

// import * as Material from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AdminHomeComponent,
    StreamComponent,
    AdminNavComponent,
    MaterialComponent,
    AdminStreamComponent,
    AddStreamComponent,
    SubjectComponent,
    AddSubjectComponent,
    AddMaterialComponent,
    AdminMaterialComponent,
    QuestionComponent,
    AddquestionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    // MaterialModule

    MatGridListModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatRadioModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
   MatSelectModule, 
    MatCheckboxModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    // PdfViewerModule
   
  ],
  providers: [AuthService,
    { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent],
  entryComponents:[SignUpComponent,
    AddStreamComponent,
    AddSubjectComponent,
  AddMaterialComponent,
AddquestionComponent]
})
export class AppModule { }
