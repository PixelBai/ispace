import { Component, ElementRef, Renderer2, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';
import { CdkMenu, CdkMenuItem, CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatChip, MatChipSet, MatChipsModule} from '@angular/material/chips';
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
  
  constructor(public wsm: WindowsManagerService,private renderer: Renderer2) { 

    this.wsm.windowDtos.subscribe(s => {
      this.windowDtos = s.slice().sort((a,b)=>a.taskbarSort-b.taskbarSort);
      this.rendering();
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

  ngAfterViewInit() {

    this.rendering();
  }


  @ViewChild('chipset') chipset?: any;
  rendering_defaultWidth = 200;
  rendering_width = this.rendering_defaultWidth;

  rendering() { 
    
    if (this.windowDtos.length <= 0) {
      return;
    }

    debugger;
    // step 1: 获取当前最大宽度
    if(this.chipset){
       
      let width = this.chipset._elementRef.nativeElement.offsetWidth;
      let one_width = Math.floor(width/this.windowDtos.length);

      if(one_width < this.rendering_defaultWidth){
        this.rendering_width = one_width-10;
      }
      else{
        this.rendering_width = this.rendering_defaultWidth;
      }
    }
  }
  



}
