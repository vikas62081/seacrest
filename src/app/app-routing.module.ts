import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StreamComponent } from './stream/stream.component';
import { MaterialComponent } from './material/material.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminStreamComponent } from './admin/admin-stream/admin-stream.component';
import { SubjectComponent } from './admin/subject/subject.component';
import { AdminMaterialComponent } from './admin/admin-material/admin-material.component';
import { QuestionComponent } from './admin/question/question.component';



const routes: Routes = [
  { path:  '', redirectTo:'/home',pathMatch:'full'},
  { path:  'home', component: HomeComponent },
  { path:  'login', component: LoginComponent },
  { path:  'signUp', component: SignUpComponent },
  { path:  'stream/:streamId', component: StreamComponent },
  // { path:  'material/WRITTEN NOTES', component: WrittenComponent},
  // { path:  'material/ORAL', component: OralComponent },
  // { path:  'material/QUESTION BANK', component: QUESTIONComponent },
  // { path:  'material/MISS. (PPT OR PDF)', component: MissComponent },
  { path:  'material', component:MaterialComponent},
  // { path:  'profile', component: ProfileComponent },
  // { path: 'district/:district', component: DistrictComponent },
  // { path: 'virusInfo', component: VirusInfoComponent },
  {
    path: 'admin', component: AdminNavComponent, children: [
        { path: '', component: AdminHomeComponent },
      //{ path:  '', redirectTo:'admin/user',pathMatch:'full'},
        { path: 'user', component: AdminHomeComponent },
        { path: 'stream', component: AdminStreamComponent },
        { path: 'subject', component: SubjectComponent },
        { path: 'material', component: AdminMaterialComponent},
        { path: 'securityquestion', component: QuestionComponent}
       
    ]
},
  { path:  '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
