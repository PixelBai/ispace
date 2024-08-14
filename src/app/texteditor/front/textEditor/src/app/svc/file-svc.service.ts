import { Injectable } from '@angular/core';
 

@Injectable({
  providedIn: 'root'
})
export class FileSvcService {

  //1.fileinfo
  info:any;

  //2.filecontent
  content:any;

  //3.status -- 0: loading fileinfo  1: loading filecontent 2: ready 3.saving
  status:number = 0;

  //4.msg
  msg:string = "";


  constructor() { 

      // step 1: 加载文件信息
      // step 2： 加载文件内容
      // step 3: 更新就绪状态

      // step4： 等待保存 
  }


  init(){

    // step 1: 获取当前文件
 
  }


  getContent(){

  }





}
