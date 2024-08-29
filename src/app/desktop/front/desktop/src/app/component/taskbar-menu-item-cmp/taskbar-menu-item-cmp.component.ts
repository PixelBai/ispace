import { Component, Input, ViewChild } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipDefaultOptions, MatTooltipModule } from '@angular/material/tooltip'; 
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto'; 
import { TaskbarMenuItemDto } from './taskbar-menu-item-dto';
import { CdkMenuModule } from '@angular/cdk/menu';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 10,
  touchendHideDelay: 1000,
};
@Component({
  selector: 'app-taskbar-menu-item-cmp',
  standalone: true,
  imports: [MatTooltipModule,CdkMenuModule],
  templateUrl: './taskbar-menu-item-cmp.component.html',
  styleUrl: './taskbar-menu-item-cmp.component.sass',
  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
})
export class TaskbarMenuItemCmpComponent {

  @Input()
  public data!: TaskbarMenuItemDto;

  @ViewChild('body') tooltip!: any;

  constructor() { 

  }

  ngOnInit() { 
    debugger
      this.data.desc = this.formatInfo(this.data.data);
  }

  formatInfo(info:fileInfoBaseDto):string{
    let result = "";
    result += "名称：" + info.name;
    result += "\n大小：" + info.size;
    result += "\n修改时间：" + info.modTime;
    return result;
  }

}
