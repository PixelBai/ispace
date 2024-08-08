import { Component, Input } from '@angular/core';
import { auth } from 'ispace.core.main';

@Component({
  selector: 'app-toolbar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './toolbar-cmp.component.html',
  styleUrl: './toolbar-cmp.component.sass'
})
export class ToolbarCmpComponent {


  @Input() editorApi: any;

  constructor() { 
    this.initUserInfo();
   } 
 
  // section user info:
  userInfo: any;
  initUserInfo() {
    this.userInfo = auth.getUserInfo();
  }

 

}
