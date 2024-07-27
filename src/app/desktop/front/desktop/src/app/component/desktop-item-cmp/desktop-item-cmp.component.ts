import { Component, Input, output, ViewChild } from '@angular/core';
import { DesktopItemDto } from './desktop-item-dto'; 
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 10,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-desktop-item-cmp',
  standalone: true,
  imports: [MatTooltipModule,],
  templateUrl: './desktop-item-cmp.component.html',
  styleUrl: './desktop-item-cmp.component.sass',

  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
})
export class DesktopItemCmpComponent {
 
  @Input()
  public data!: DesktopItemDto;

  @ViewChild('body') tooltip!: any;


  constructor() {   
  }

  ngOnInit() { 
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
