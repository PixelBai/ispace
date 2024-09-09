import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, output, ViewChild } from '@angular/core';
import { DesktopItemDto } from './desktop-item-dto';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipDefaultOptions, MatTooltipModule } from '@angular/material/tooltip';
import { fileInfoBaseDto } from 'ispace.core.main/dist/dto/fileInfoBaseDto';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { file, folder } from 'ispace.core.main';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { DriverOperationDto } from 'ispace_de';
import { DriveEnginService } from '../../service/drive-engin.service';
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
 
  basePath: string = "Desktop"; 

  constructor(private cdr: ChangeDetectorRef,private driveEngine: DriveEnginService) {
  }

  ngOnInit() {
    this.data.desc = this.formatInfo(this.data.data);
    this.init_sourceManagerOpen();
    this.open_init();
  }

  formatInfo(info: fileInfoBaseDto): string {
    let result = "";
    result += "名称：" + info.name;
    result += "\n大小：" + info.size;
    result += "\n修改时间：" + info.modTime;
    return result;
  }
@Output() onRemove = new EventEmitter<DesktopItemDto>(); 

  open_op?:DriverOperationDto; 
  open_init() {
    debugger
    if (this.data.type == "folder") {
      let op =  this.ext_operations.find(s=>s.driverId==1 && s.id==1);
      if(!op)
        {
          console.error("not found");
          return;
        }
      this.open_op = op;
    }
    else { 
      let op =  this.ext_operations.find(s=>s.name=="打开");
      if(!op)
        {
          console.error("not found");
          return;
        }
      
      // 获取打开的驱动，复制对应文件图标
      let iconUrl = this.driveEngine.driveEngine.drivers.value.find(s=>s.id==op!.driverId)?.fileIconUrl;
      if(iconUrl)
      {
        this.data.iconUrl = iconUrl;
      }
      this.open_op = op;
    }
  }
  open() {  
    this.driveEngine.execute(this.open_op!.driverId,this.open_op!.id,this.data.path); 
  }
 
  @ViewChild('renameInput') renameInput!: ElementRef<HTMLInputElement>;
  renaming = false;
  template_name = "";
  rename() {
    this.renaming = true;
    this.template_name = this.data.name; 
    this.renameInput.nativeElement.onblur = () => {
      this.confirm_rename();
    }   
    setTimeout(()=>{
      this.renameInput.nativeElement.focus();
      this.renameInput.nativeElement.setSelectionRange(0, this.template_name.length);
  })
  }
  
  confirm_rename() {
    if (this.data.type == "folder") {
      folder.rename(this.basePath, this.data.name, this.template_name).subscribe(s => {
        this.data.path = this.data.path.replace("/"+this.data.name,"/"+ this.template_name);
        this.data.name = this.template_name;
        this.init_sourceManagerOpen();
      }, e => {
        console.error(e);
      })
    }
    else {
      file.rename(this.basePath, this.data.name, this.template_name).subscribe(s => {
        this.data.path = this.data.path.replace("/"+this.data.name,"/"+ this.template_name);
        this.data.name = this.template_name;
        this.init_sourceManagerOpen();
      }, e => {
        console.error(e);
      })
    } 
    this.renaming = false;
  }


  ext_operations: DriverOperationDto[] = [];
  ext_operations_current: DriverOperationDto[] = [];
  init_sourceManagerOpen() { 
    this.ext_operations=  this.driveEngine.getOperations(this.data.name,this.data.type == "folder"); 
    this.ext_operations_current = this.ext_operations.filter(s => s.name !=="打开");
    if(this.data.type == "folder") {
      this.ext_operations_current = this.ext_operations_current.filter(s => s.name !=="资源管理器打开");
    } 
  }
  
  ext_operation_execute(operation: DriverOperationDto) {
       this.driveEngine.execute(operation.driverId,operation.id,this.data.path);
  }
  
  


}
