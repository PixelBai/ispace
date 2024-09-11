import { Component } from '@angular/core';
import { WindowCmpComponent } from '../window-cmp/window-cmp.component';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { WindowDto } from '../../dto/windowDto';

@Component({
  selector: 'app-window-container-cmp',
  standalone: true,
  imports: [CommonModule, WindowCmpComponent,CdkDrag],
  templateUrl: './window-container-cmp.component.html',
  styleUrl: './window-container-cmp.component.sass'
})
export class WindowContainerCmpComponent {  

  windowDtos:WindowDto[] = []

  constructor(public wsm: WindowsManagerService,public sanitizer: DomSanitizer) {
 
    for (let i = 0; i < 5; i++) { 
      this.wsm.open("新窗口--------"+i, "http://127.0.0.1/app/text-editor/#/home?path=Desktop%2F123.txt"); 
    }

    this.wsm.windowDtos.subscribe(s => {
      this.windowDtos = s;
    });


   }

   onDragEnded(event: CdkDragEnd<any>, item: WindowDto) {
    item.position = event.source.getFreeDragPosition();
    item.isSizeMax = false;
  }

}
