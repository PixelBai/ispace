import { Component, Input, ViewChild } from '@angular/core';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { file } from 'ispace.core.main';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto'; 
import { TaskbarMenuItemDto } from './taskbar-menu-item-dto';

@Component({
  selector: 'app-taskbar-menu-item-cmp',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './taskbar-menu-item-cmp.component.html',
  styleUrl: './taskbar-menu-item-cmp.component.sass'
})
export class TaskbarMenuItemCmpComponent {

  @Input()
  public data!: TaskbarMenuItemDto;

  @ViewChild('body') tooltip!: any;

  constructor() { 

  }

  ngOnInit() { 
      
  }

  hide(tooltip:MatTooltip): void {
    this.tooltip.disabled = true;
  }

  display(tooltip:MatTooltip): void {
    this.data.desc = this.formatInfo(this.data.data);
    this.displayInfo(tooltip);
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
