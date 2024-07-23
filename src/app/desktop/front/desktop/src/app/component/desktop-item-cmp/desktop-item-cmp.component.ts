import { Component, Input, output, ViewChild } from '@angular/core';
import { DesktopItemDto } from './desktop-item-dto'; 
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import {file,folder } from 'ispace.core.main';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';
import { Type } from '@angular/compiler';
@Component({
  selector: 'app-desktop-item-cmp',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './desktop-item-cmp.component.html',
  styleUrl: './desktop-item-cmp.component.sass'
})
export class DesktopItemCmpComponent {
 
  @Input()
  public data!: DesktopItemDto;

  @ViewChild('body') tooltip!: any;


  constructor() { 

  }

  ngOnInit() { 
      
  }

  hide(tooltip:MatTooltip): void {
    this.tooltip.disabled = true;
  }

  display(tooltip:MatTooltip): void {

    // step 1: 获取当前详细信息 
    this.getInfo().then( (s) => {
      if(s[0]){
        this.data.desc = this.formatInfo(s[1]!);
        this.displayInfo(tooltip);
      }
      else{  
        this.data.desc = "获取详细信息失败";
        this.displayInfo(tooltip);
      }
    }) 
    return;
  }
 
  displayInfo(tooltip:MatTooltip):void{ 
    tooltip.message = this.data.desc!;
    tooltip.disabled = false;
    tooltip.show();
  }

  getInfo():Promise<([boolean,fileInfoBaseDto|null])>{
    return new Promise<[boolean,fileInfoBaseDto|null]>((resolve) => {
      if(this.data.type == "folder"){
        file.statf(this.data.path).subscribe( (s) => {
          return resolve([true,s])
        }, (e) => {
          console.log(e); 
          resolve([false,null])
        }) 
      }
  
      if(this.data.type == "file"){
        file.statf(this.data.path).subscribe( (s) => {
          return resolve([true,s])
        }, (e) => {
          console.log(e); 
          resolve([false,null])
        })
      }  
    })
  }

  formatInfo(info:fileInfoBaseDto):string{
    let result = "";
    result += "名称：" + info.name;
    result += "\n大小：" + info.size;
    result += "\n修改时间：" + info.modTime;
    return result;
  }


}
