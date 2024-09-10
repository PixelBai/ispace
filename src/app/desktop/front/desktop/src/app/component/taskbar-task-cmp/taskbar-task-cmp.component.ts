import { Component } from '@angular/core';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WindowDto } from '../../dto/windowDto';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
@Component({
  selector: 'app-taskbar-task-cmp',
  standalone: true,
  imports: [CommonModule,CdkMenuModule,CdkMenuTrigger,  CdkMenu, CdkMenuItem,MatButtonModule,MatChipsModule, CdkDropList, CdkDrag],
  templateUrl: './taskbar-task-cmp.component.html',
  styleUrl: './taskbar-task-cmp.component.sass'
})
export class TaskbarTaskCmpComponent {
 

  constructor(public wsm: WindowsManagerService) { 

  }

  drop(event: CdkDragDrop<WindowDto[]>) { 
      let pw =this.data[event.previousIndex];
      let ci =this.data[event.currentIndex];
      let pwindex = pw.taskbarSort;
      pw.taskbarSort = ci.taskbarSort;
      ci.taskbarSort = pwindex; 
  }
 
  data: WindowDto[] = [];
  getData() {
    this. data = this.wsm.windowDtos.slice().sort((a, b) => a.taskbarSort - b.taskbarSort);
    return this.data;
  }

}
