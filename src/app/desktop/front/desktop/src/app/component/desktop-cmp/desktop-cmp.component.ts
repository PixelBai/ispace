import { Component, ElementRef, ViewChild } from '@angular/core';
import { DesktopItemDto } from '../desktop-item-cmp/desktop-item-dto';
import {file,folder} from 'ispace.core.main';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';
import { DesktopItemCmpComponent } from '../desktop-item-cmp/desktop-item-cmp.component';
import { CommonModule } from '@angular/common';
import { resultDto } from 'ispace.core.main/dist/dto/resultDto';

@Component({
  selector: 'app-desktop-cmp',
  standalone: true,
  imports: [DesktopItemCmpComponent,CommonModule],
  templateUrl: './desktop-cmp.component.html',
  styleUrl: './desktop-cmp.component.sass'
})
export class DesktopCmpComponent {

  basePath = "Desktop"

  desktopItems:DesktopItemDto[] = [];

  positions:{[key:string]:{x:number,y:number}} = {};

  @ViewChild("body",{static:false}) body!:ElementRef;
  ngOnInit() { 
      
  }

  init(){
    this.load();
  }


  load(){ 
    // 加载桌面文件、文件夹数据；
    this.load_children().then((s)=>{
      if(s){
        // 加载桌面项位置信息
        return this.load_position(); 
      }
    }).then((s)=>{
      if(s){
        // 构建桌面项，生成桌面项列表
        return this.rendering();
      }
    });   
  }

  load_children():Promise<boolean>{
    // 加载桌面文件、文件夹数据
    return new Promise<boolean>((resolve) => {
      folder.children("Desktop")
      .subscribe(
      (s)=>{
        s.forEach((info)=>{
          this.desktopItems.push(this.convertInfo(info));
        })
        resolve(true);
      },
      (e)=>{
        console.log(e);
        resolve(false);
      }
    )
    })
     
  } 

  load_position():Promise<boolean>{
    // 加载桌面项位置信息
    return new Promise<boolean>((resolve) => {
        // 获取 basePath + .position 文件,内容信息
        file.content(this.basePath+"/.position")
        .subscribe( (s) => { 
          // 保存到当前变量
          if(s?.length>0)
          {
            this.positions = JSON.parse(s);
          }
          else
          {
            this.positions = this.init_position();
          }
          resolve(true);
        } , (e) => {
          console.log(e);
          resolve(false);
        })
    })
  }

  rendering(){
    // check
    if(this.desktopItems.length<=0){
      return;
    }
    if(Object.keys(this.positions).length<=0){
      return;
    }

    // step core:
    this.desktopItems.forEach((item)=>{
      if(this.positions[item.id]){
        item.position = this.positions[item.id];
      }
    }) 
  }


  convertInfo(info:fileInfoBaseDto):DesktopItemDto{
    let result = new DesktopItemDto();
    result.id = (info.isDir?"folder":"file")+"-"+info.name;
    result.path = this.basePath+"/"+info.name;
    result.name = info.name??(info.isDir?"未命名文件夹":"未命名文件");
    result.data = info;
    result.type = info.isDir?"folder":"file";
    result.iconUrl = info.isDir?"./assets/images/folder.png":"./assets/images/file.png";
    return result;
  }

  init_position(): { [key: string]: { x: number; y: number; }; } {
    // check:
    if(this.desktopItems.length<=0){
      return this.positions;
    }

    // step: init 获取当前bodydiv的可视高度、宽度
    let bodyHeight = this.body.nativeElement.clientHeight;

    // 单个所占宽高
    let itemHeight = 100;
    let itemWidth = 100;

    // core :
    let indexPosition = {x:0,y:0};
    this.desktopItems.forEach((item)=>{
      this.positions[item.id] = indexPosition;

      // step : 根据当前项的高度，计算下一个项的位置 
      if (indexPosition.y+itemHeight*2 > bodyHeight) {
        indexPosition.y = 0;
        indexPosition.x = indexPosition.x + itemWidth;
      }
      else{
        indexPosition.y = indexPosition.y + itemHeight;
      }
    })
  
    return this.positions;
    } 
  
}
 
 
