import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LoginCanActivate } from './system/login-gurd';

export const routes: Routes = [
    { path:'',redirectTo:"home",pathMatch:'full'},      
    { path:'home',component:HomePageComponent,canActivate: [LoginCanActivate] },
];
