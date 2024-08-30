import { Component } from '@angular/core';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-taskbar-task-cmp',
  standalone: true,
  imports: [CommonModule,CdkMenuModule,CdkMenuTrigger,  CdkMenu, CdkMenuItem,MatButtonModule],
  templateUrl: './taskbar-task-cmp.component.html',
  styleUrl: './taskbar-task-cmp.component.sass'
})
export class TaskbarTaskCmpComponent {

  constructor(public wsm: WindowsManagerService) { 
    

  }

}
