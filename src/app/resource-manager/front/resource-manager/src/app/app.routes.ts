import { Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { LoginCanActivate } from './system/login-gurd';
import { PropertyPageComponent } from './page/property-page/property-page.component';

export const routes: Routes = [
    { path:'',redirectTo:"home",pathMatch:'full'},      
    { path:'home',component:HomePageComponent,canActivate: [LoginCanActivate] },
    { path:'property',component:PropertyPageComponent,canActivate: [LoginCanActivate] },
];
