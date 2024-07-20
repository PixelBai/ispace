import { Routes } from '@angular/router'; 
import { LoginCanActivate } from './system/login-gurd';
import { IndexComponent } from './page/index/index.component';

export const routes: Routes = [

    { path:'',redirectTo:"index",pathMatch:'full'},      
    { path:'index',component:IndexComponent,canActivate: [LoginCanActivate] },

];

