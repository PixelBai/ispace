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
 
  windowDtos:WindowDto[] = [] 
  
  constructor(public wsm: WindowsManagerService) { 

    this.wsm.windowDtos.subscribe(s => {
      this.windowDtos = s.slice().sort((a,b)=>a.taskbarSort-b.taskbarSort);
    });

  }

  drop(event: CdkDragDrop<WindowDto[]>) { 

    let diff = event.currentIndex - event.previousIndex;

    if(diff>0){  
      //previous（不包含） 到 current（包含），位置减一
      let index = event.previousIndex;
      while(++index<=event.currentIndex){
        this.windowDtos[index].taskbarSort = this.windowDtos[index].taskbarSort-1;
      }
      // previous 位置处理diff
      this.windowDtos[event.previousIndex].taskbarSort = this.windowDtos[event.previousIndex].taskbarSort + diff;
    }
    else{
      // previous（包含） 到 current（不包含） 位置加一
      let index = event.previousIndex;
      while(--index>=event.currentIndex){
        this.windowDtos[index].taskbarSort = this.windowDtos[index].taskbarSort+1;
      }
      // previous 位置处理diff
      this.windowDtos[event.previousIndex].taskbarSort = this.windowDtos[event.previousIndex].taskbarSort + diff;
    }
    this.windowDtos.sort((a,b)=>a.taskbarSort-b.taskbarSort);
  }
  

}
