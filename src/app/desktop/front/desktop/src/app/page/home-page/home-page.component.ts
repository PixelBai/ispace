import { Component, Inject, Injector, ViewChild } from '@angular/core';
import { DesktopCmpComponent } from "../../component/desktop-cmp/desktop-cmp.component";
import { BackgroundCmpComponent } from "../../component/background-cmp/background-cmp.component";
import { TaskbarCmpComponent } from "../../component/taskbar-cmp/taskbar-cmp.component";
 

@Component({
  selector: 'app-home-page',
  standalone: true, 
  imports: [DesktopCmpComponent, BackgroundCmpComponent, TaskbarCmpComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent {

   
  ngOnInit(): void { 

  } 

}
