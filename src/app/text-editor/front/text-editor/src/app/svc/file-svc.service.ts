import { Injectable } from '@angular/core';
import { file, fileInfoDto } from 'ispace.core.main';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSvcService {

  //0.filepath
  filePath:BehaviorSubject<string|undefined> = new BehaviorSubject<string|undefined>(undefined);

  //1.fileinfo
  info:BehaviorSubject<fileInfoDto|undefined> = new  BehaviorSubject<fileInfoDto|undefined>(undefined);

  //2.filecontent
  content:BehaviorSubject<string> = new BehaviorSubject<string>("");

  //3.status -- 0: loading fileinfo  1: loading filecontent 2: ready 3.saving
  status:BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  statusType =  {
    loadingFileInfo:0,
    loadingFileContent:1,
    ready:2,
    saving:3
  };
  //4.msg
  msg:string = "";
   
  init(filePath:string){
 
    this.filePath.next(filePath);

    // step 1: 标记状态
    this.status.next(this.statusType.loadingFileInfo);
    
    // step 1: 获取当前文件信息
    this.getFileInfo(filePath)
    .then((s)=>{ 
      if(!s[0] && s[1]==null){
        return;
      }

      // step 2: 存储数据并标记状态
      this.info.next(s[1]!);
      this.status.next(this.statusType.loadingFileContent);
      
      // step 3: 获取当前文件内容
     return this.getContent(filePath);
    })
    .then((s)=>{

      if(s==undefined)  {
        return;
      }

      if(!s[0]){
        return;
      }

      // step 4: 存储数据并标记状态
      this.content.next(s[1]);
      this.status.next(this.statusType.ready); 
    }) 
  }

  save(content:string):Promise<[boolean,string]>{

    return new Promise<[boolean,string]>((resolve) => {
      
    let filePath = this.filePath.value;

    if(!filePath){
      return resolve([false,"filepath is null"]);
    }

    // step 1: 标记状态
    this.status.next(this.statusType.saving);

    // step core: 保存内容
    file.write(filePath!,content).subscribe({
      next: (s) => {
        resolve([true,""]);
      },
      error: (e: any) => {
        console.log(e);
        this.msg = JSON.stringify(e);
        resolve([false,this.msg ]);
      },
      complete: () => {
        this.status.next(this.statusType.ready); 
      }
      });
    }); 
  }
 
  getFileInfo(filePath:string):Promise<[boolean,(fileInfoDto | null)]>{ 
    return new Promise<[boolean,(fileInfoDto | null)]>((resolve) => {
      file.statf(filePath).subscribe({
        next: (s) => {
          resolve([true,s]);
        },
        error: (e: any) => {
          console.log(e);
          this.msg = JSON.stringify(e);
          resolve([false,null]);
        }
      })
    });
    
  }
  
  getContent(filePath:string):Promise<[boolean,string]>{
    return new Promise<[boolean,string]>((resolve) => {
      file.content(filePath).subscribe({
        next: (s) => {
          resolve([true,s]);
        },
        error: (e: any) => {
          console.log(e);
          this.msg = JSON.stringify(e);
          resolve([false,""]);
        }
      })
    });

  }
 
}
