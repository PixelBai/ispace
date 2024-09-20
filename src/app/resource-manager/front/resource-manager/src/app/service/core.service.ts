import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { pathDto } from './pathDto';
import { S } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { fileInfoBaseDto, fileInfoDto, folder, folderInfoDto, QueryDto } from 'ispace.core.main';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { 
  }

  /************* 公共模块  **************/

  // 文件夹路径
  path = new BehaviorSubject<pathDto>(new pathDto());

  // 查询参数
  query = new BehaviorSubject<string>("");

  // 初始化
  init(path:string = "") {
    // step 1: 初始化路径
    if (path !== this.path.value.path) {
      this.path.next({id: 0, path: path, isHistory: false });  
    }

    // step 2: 初始化记录
    this.recordsInit();

    // step 3: 
    this.initDirNav();


    this.setMsg("就绪");
  }

  setPath(path:string) {
    let last =  this.path.value;

    let p = new pathDto();
    p.id = this.path.value.id+1;
    p.path = path;
    p.isHistory = false;
    p.backRef = this.path.value;
    p.forwardRef = undefined;
    this.path.next(p); 

    last.forwardRef = p;
  } 


  setQuery(query:string) {
    this.query.next(query);
  }
 
  /************* 工具栏模块  **************/
  // 记录
  records:pathDto[] = [];

  // 记录处理初始化
  recordsInit() {
    this.path.subscribe(s => {
      if(s.isHistory) return;
      s.isHistory = true;
      this.records.push(s);
    })
  }

  // 后退
  isCanBack() {
    return this.path.value.backRef !== undefined;
  }
  recordBack() { 
       if(this.isCanBack()) { 
          this.path.next(this.path.value.backRef!);
      } 
  }

  // 前进
  isCanForward() {
    return this.path.value.forwardRef !== undefined;
  }
  recordForward() {
    if(this.isCanForward()) {
      this.path.next(this.path.value.forwardRef!);
    }
  }

  // 转到父目录
  isExistParent() {
    return this.path.value.path !== "/";
  }
  toParent() {
     if(this.isExistParent()) { 
      let last =  this.path.value;

      let p = new pathDto();
      p.id = this.path.value.id+1;
      p.path = this.path.value.path.substring(0, this.path.value.path.lastIndexOf("/"));
      p.path = p.path === "" ? "/" : p.path;
      p.isHistory = false;
      p.backRef = this.path.value;
      p.forwardRef = undefined;
      this.path.next(p);

      last.forwardRef = p;
     }
  }

  // 刷新
  refreshSub = new Subject<pathDto>();
  refresh() {
    this.refreshSub.next(this.path.value);
  }

  /************* 侧边模块  **************/

  // 快捷访问文件夹列表
  quickFolders = new BehaviorSubject<fileInfoDto[]>([]);

  // 全部文件夹列表
  allFolders = new BehaviorSubject<folderInfoDto[]>([]);

  initDirNav(){
    // step 1: 快捷访问
    let query_quick = new QueryDto();
    query_quick.path = "/quick";
    folder.children(query_quick).subscribe({
      next: (s) => { 
        this.quickFolders.next(s.filter(f => !f.isDir)); 
      }, error: (e: any) => {
        console.error(e);
      }
    })
    // step 2: 全部
    let query_all = new QueryDto();
    query_quick.path = "/";
    folder.children(query_all).subscribe({
      next: (s) => { 
        this.allFolders.next(s.filter(f => f.isDir));
      }, error: (e: any) => {
        console.error(e);
      }
    })

  }
  /************* 状态模块  **************/
  currentFiles = new BehaviorSubject<fileInfoBaseDto[]>([]);




  /************* 状态模块  **************/
  // 信息
  msg = new BehaviorSubject<string>("");

  setMsg(msg:string) {
    this.msg.next(msg);
  }
  
}
