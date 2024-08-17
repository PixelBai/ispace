import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.sass'
})
export class WindowComponent {

  @Input("title") title = "测试窗口"
  @Input("url") url = "http://www.baidu.com";
  
  constructor() {
  }

  ngOnInit(): void {

  }

  public min() {
  }

  public max() {
  }
 
  public restore() {
  }

  public close() {
  }

  // 前进
  public forward() {
  }

  // 后退
  public back() {
  }

  // 刷新
  public refresh() {
  }

}
