import { Injectable } from '@angular/core';
import { WindowDto } from '../dto/windowDto';
import { DomSanitizer } from '@angular/platform-browser';
import { W } from '@angular/cdk/keycodes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsManagerService {
showOrHide(id: number) {
  // step 1: 找到对应的windowDto
  let windowDto = this.windowDtos.value.find(s => s.id == id);
  if (!windowDto) { return; }
      // step 2: 设置显示
      windowDto!.isHide = !windowDto!.isHide ;
 
}
closeAll() { 
     this.windowDtos.next([]);
}

  hide(id: number) { 
    // step 1: 找到对应的windowDto
    let windowDto = this.windowDtos.value.find(s => s.id == id);
    if (!windowDto) { return; }
    // step 2: 设置隐藏
    windowDto!.isHide = true;
  }

  show(id: number) {
    // step 1: 找到对应的windowDto
    let windowDto = this.windowDtos.value.find(s => s.id == id);
    if (!windowDto) { return; }
    // step 2: 设置显示
    windowDto!.isHide = false;

  }

  sizeCommon(id: number) {
    // step 1: 找到对应的windowDto
    let windowDto = this.windowDtos.value.find(s => s.id == id);
    if (!windowDto) { return; }
    // step 2: 设置最大化
    windowDto!.isSizeMax = false; 
  }
  sizeMax(id: number) {
    // step 1: 找到对应的windowDto
    let windowDto = this.windowDtos.value.find(s => s.id == id);
    if (!windowDto) { return; }
    // step 2: 设置最大化
    windowDto!.isSizeMax = true; 

  }

  windowDtos = new BehaviorSubject<WindowDto[]>([]);

  maxId = 0;

  open(title: string, url: string) {

    // step 1: 构建windowDto 
    let windowDto = new WindowDto();
    windowDto.id = this.generateId();
    windowDto.title = title;
    windowDto.width = "1200px";
    windowDto.height = "900px";
    windowDto.left = 0;
    windowDto.top = 0;
    windowDto.zIndex = 0;
    windowDto.url = url;
    windowDto.taskbarSort = windowDto.id;

    // step 2: 添加到windowDtos
    this.windowDtos.next([...this.windowDtos.value, windowDto]);

  }

  close(id: number) { 
    // step 1: 从windowDtos中移除
    let currentWindowDtos = this.windowDtos.value.filter((s) => {
      return s.id != id
    }) 
    this.windowDtos.next(currentWindowDtos); 
  }
  generateId(): any {
    return ++this.maxId
  }

  constructor(private sanitizer: DomSanitizer) { } 

}
