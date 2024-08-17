import { Component } from '@angular/core';
import { DesktopCmpComponent } from "../../component/desktop-cmp/desktop-cmp.component";
import { BackgroundCmpComponent } from "../../component/background-cmp/background-cmp.component";
import { TaskbarCmpComponent } from "../../component/taskbar-cmp/taskbar-cmp.component";

import { WindowsComponent } from 'ispace.windows/dist/windows';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DesktopCmpComponent, BackgroundCmpComponent, TaskbarCmpComponent,WindowsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent {

  
  ngOnInit(): void {



  }


}
