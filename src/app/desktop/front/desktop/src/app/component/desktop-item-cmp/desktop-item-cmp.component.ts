import { Component, ElementRef, EventEmitter, Input, Output, output, ViewChild } from '@angular/core';
import { DesktopItemDto } from './desktop-item-dto';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipDefaultOptions, MatTooltipModule } from '@angular/material/tooltip';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { file, folder } from 'ispace.core.main';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 10,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-desktop-item-cmp',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, CdkMenuModule, FormsModule,CdkDragHandle],
  templateUrl: './desktop-item-cmp.component.html',
  styleUrl: './desktop-item-cmp.component.sass',

  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }],
})
export class DesktopItemCmpComponent {


  @Input()
  public data!: DesktopItemDto;

  @ViewChild('body') tooltip!: any;
  basePath: string = "Desktop";


  constructor() {
  }

  ngOnInit() {
    this.data.desc = this.formatInfo(this.data.data);
  }

  formatInfo(info: fileInfoBaseDto): string {
    let result = "";
    result += "名称：" + info.name;
    result += "\n大小：" + info.size;
    result += "\n修改时间：" + info.modTime;
    return result;
  }
@Output() onRemove = new EventEmitter<DesktopItemDto>(); 

  open() {

  }


  @ViewChild('renameInput') renameInput!: ElementRef<HTMLInputElement>;
  renaming = false;
  template_name = "";
  rename() {
    this.renaming = true;
    this.template_name = this.data.name;
    this.renameInput.nativeElement.focus();
    this.renameInput.nativeElement.onblur = () => {
      this.confirm_rename();
    }
  }

  confirm_rename() {
    if (this.data.type == "folder") {
      folder.rename(this.basePath, this.data.name, this.template_name).subscribe(s => {
        this.data.name = this.template_name;
      }, e => {
        console.error(e);
      })
    }
    else {
      file.rename(this.basePath, this.data.name, this.template_name).subscribe(s => {
        this.data.name = this.template_name;
      }, e => {
        console.error(e);
      })
    }
    this.renaming = false;
  }



}
