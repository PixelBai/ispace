import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { auth } from 'ispace.core.main';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-toolbar-cmp',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatButtonModule, MatMenuModule],
  templateUrl: './toolbar-cmp.component.html',
  styleUrl: './toolbar-cmp.component.sass'
})
export class ToolbarCmpComponent {


  @Input() editorApi: any;

  constructor(public dialog: Dialog) { 
   // this.initUserInfo();
   } 
 
  // section user info:
  userInfo: any;
  initUserInfo() {
    // this.userInfo = auth.getUserInfo();
  }
 
  openDialog() {
    this.dialog.open(SettingsDialogComponent, {
      minWidth: '600px',
      data: null,
    });
  }  




  
 

}
