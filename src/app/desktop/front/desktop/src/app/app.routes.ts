import { Routes } from '@angular/router';
import { IndexComponent } from './page/index/index.component';
import { LoginCanActivate } from './system/login-gurd';

export const routes: Routes = [

    { path:'',redirectTo:"index",pathMatch:'full'},      
    { path:'index',component:IndexComponent,canActivate: [LoginCanActivate] },
];
