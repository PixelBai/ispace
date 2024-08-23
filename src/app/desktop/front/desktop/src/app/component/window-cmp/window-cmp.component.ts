import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WindowContainerComponent } from '../window-container/window-container.component';
import { WindowsManagerService } from '../../service/windows-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-window-cmp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './window-cmp.component.html',
  styleUrl: './window-cmp.component.sass'
})
export class WindowCmpComponent { 

  // 窗口id
  @Input("id") id!:number;

  // 标题
  @Input("title") title = "测试窗口"
  // 地址
  @Input("url") url = "http://www.baidu.com";
  // 大小状态
  sizeStatus:'common'|'max'|'min' = 'common';

  // 宽 高
  @Input("width") width = '300px'; 
  @Input("height") height = '200px'; 
  commonSize = {width:this.width, height:this.height};

  // page
  @ViewChild('page') page!: HTMLIFrameElement;
  
  constructor() { 
  }

  ngOnInit(): void {
  }
  
  //* 头部 */
  public sizeMin() {
    this.sizeStatus = 'min';
  }

  public sizeMax() {  
    this.sizeStatus = 'max';

    // 存储常规大小
    this.commonSize = {width:this.width, height:this.height};

    // 调整到最大 
    this.width = '100%';
    this.height = '100%'; 
  }
 
  public sizeCommon() {
    this.sizeStatus = 'common';

    // 恢复常规大小
    this.width = this.commonSize.width;
    this.height = this.commonSize.height;
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

}
