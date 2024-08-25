import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WindowContainerCmpComponent } from '../window-container-cmp/window-container-cmp.component';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragHandle, CdkDrag } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-window-cmp',
  standalone: true,
  imports: [CommonModule,CdkDragHandle,CdkDrag,MatToolbarModule,MatButtonModule, MatIconModule],
  templateUrl: './window-cmp.component.html',
  styleUrl: './window-cmp.component.sass'
})
export class WindowCmpComponent { 

  // 窗口id
  @Input("id") id!:number;

  // 标题
  @Input("title") title = "测试窗口"
  // 地址
  @Input("url") url= "http://www.baidu.com";
  // 大小状态
  sizeStatus:'common'|'max'|'min' = 'common';

  // page
  @ViewChild('page') page!: HTMLIFrameElement;
  
  constructor(private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
  }
  
  //* 头部 */
  public sizeMin() {
    this.sizeStatus = 'min';
  }

  public sizeMax() {  
    this.sizeStatus = 'max';
  }
 
  public sizeCommon() {
    this.sizeStatus = 'common';
  }

  @Output() close = new EventEmitter<number>(); 
  
  // 前进
  public forward() {
    this.page.contentWindow?.history.forward();
  }

  // 后退
  public back() {
    this.page.contentWindow?.history.back();
  }

  // 刷新
  public refresh() {
    this.page.contentWindow?.location.reload();
  }


  safeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
 

}
