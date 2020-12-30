import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './exam/home/home.component';
import {LayoutComponent} from './exam/layout/layout.component';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  { 
    path: 'home', 
    component: LayoutComponent,
    children: [   
      { path: '', component: HomeComponent } 
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
