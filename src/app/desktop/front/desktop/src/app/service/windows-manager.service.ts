import { Injectable } from '@angular/core';
import { WindowDto } from '../dto/windowDto';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class WindowsManagerService {
 
  windowDtos: WindowDto[] = [];
 
  maxId = 0;
  
  open(title: string, url: string) {

      // step 1: 构建windowDto 
      let windowDto = new WindowDto();
      windowDto.id = this.generateId();
      windowDto.title = "新窗口";
      windowDto.width = "400px";
      windowDto.height = "300px";
      windowDto.left = 0;
      windowDto.top = 0;
      windowDto.zIndex = 0; 
      windowDto.url =  url;

      debugger
      // step 2: 添加到windowDtos
      this.windowDtos.push(windowDto);

  }

  close(id: number) {

    // step 1: 从windowDtos中移除
    this.windowDtos = this.windowDtos.filter((s) => {
      return s.id != id
    })
    
  }
  generateId(): any {
     return ++this.maxId
  }

  constructor(private sanitizer: DomSanitizer) { }






}
