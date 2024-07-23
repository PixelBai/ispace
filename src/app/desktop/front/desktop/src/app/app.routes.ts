import { Routes } from '@angular/router'; 
import { LoginCanActivate } from './system/login-gurd'; 
import { HomePageComponent } from './page/home-page/home-page.component';

export const routes: Routes = [

    { path:'',redirectTo:"home",pathMatch:'full'},      
    { path:'home',component:HomePageComponent,canActivate: [LoginCanActivate] },
];
