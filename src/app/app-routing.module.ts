import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ManagerSignupComponent } from './manager-signup/manager-signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'manager-signup',component:ManagerSignupComponent},
  {path:'home',loadChildren:() =>import('./home/home.module').then(module=>module.HomeModule), canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
