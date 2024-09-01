import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatCardModule} from '@angular/material/card';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { auth, file, fileInfoBaseDto, folder } from 'ispace.core.main';
import { TaskbarMenuItemCmpComponent } from "../taskbar-menu-item-cmp/taskbar-menu-item-cmp.component";
import { DynamicDataSource } from './dynamicDataSource';
import { DynamicFlatNode } from './dynamicFlatNode';
import { DynamicDatabase } from './dynamicDatabase';
 
import {MatMenuModule} from '@angular/material/menu';
import { CdkMenuModule } from '@angular/cdk/menu';
import { TaskbarMenuItemDto } from '../taskbar-menu-item-cmp/taskbar-menu-item-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DriverOperationDto } from 'ispace_de';
import { DriveEnginService } from '../../service/drive-engin.service';
@Component({
  selector: 'app-taskbar-menu-cmp',
  standalone: true,
  imports: [MatIconModule, OverlayModule, MatCardModule, MatTreeModule, MatButtonModule, MatProgressBarModule, TaskbarMenuItemCmpComponent,MatMenuModule,CdkMenuModule, CommonModule, FormsModule],
  templateUrl: './taskbar-menu-cmp.component.html',
  styleUrl: './taskbar-menu-cmp.component.sass'
})
export class TaskbarMenuCmpComponent { 

  basePath = "Desktop/.ispace/menu";
  removeItem(data: TaskbarMenuItemDto) {
    debugger
    let path = data.path.replace("/" + data.name, "");
    if(data.type == "folder") { 
      folder.remove(path, data.name).subscribe(s => {
      this.load();
      }, e => {
        console.error(e);
      })
    }
    else {
      file.remove(path, data.name).subscribe(s => {
       this.load();
      }, e => {
        console.error(e);
      })
    }
  
  } 
   
logout() {
  auth.logout();
  window.location.reload();
}
 
  // all
  isOpen = false;

  // 用户区
  userName = '';

  // 列表区
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(private database: DynamicDatabase,private driveEngine: DriveEnginService) {
    this.load_templates();

    // 用户区
    this.userName = auth.getUserInfo().name??"未登录";

    // 列表区
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.load();
  }

  load() {
    this.database.initialData().then((s) => { 
      this.dataSource.data = s;
    });
    this.init_sourceManagerOpen();
  }
 

  createFolder(node?: DynamicFlatNode) { 
 
    let level = 2;
    let indexPath = this.basePath;
    if(node) {
      level = node.level+1;
      indexPath = node.item.path;
    }
 
    let maxIndex = 0;
    this.dataSource.data.filter(s => s.level == level && s.item.type == "folder" && s.item.name.startsWith("新建文件夹"))
      .forEach(s => {
         let indexStr = s.item.name.replace("新建文件夹", "").trim();
         let index = Number(indexStr);
         if (index > maxIndex) {
           maxIndex = index;
         }
      });
      maxIndex++;
    let folderName = "新建文件夹" + maxIndex;
   folder.create(indexPath, folderName).subscribe(s=>{
     this.load();
   }, e=>{
     console.error(e);
   })
  }

  /*** 新建文件 ***/
  createFile_basePath = "Desktop/.ispace/new_decument_template";
  createFile_templates:fileInfoBaseDto[] = [];

  load_templates() {
    if (this.createFile_templates.length > 0) {
       this.createFile_templates = [];
    }
    folder.children(this.createFile_basePath).subscribe(s => {
      this.createFile_templates = s.filter(s => !s.isDir);
    })
  }
  
  createFile(template: fileInfoBaseDto,node?: DynamicFlatNode) {

 
    let level = 2;
    let indexPath = this.basePath;
    if(node) {
      level = node.level+1;
      indexPath = node.item.path;
    }

    // 名称 和 后缀
    let data = template.name!.split(".");
    let name = data[0]; 
    let ext = data[1]; 

    let maxIndex = 0;
    this.dataSource.data.filter(s => s.level == level &&  s.item.type == "file" && s.item.name.endsWith('.'+ext) && s.item.name.startsWith(name))
      .forEach(s => { 
         let indexStr = s.item.name.replace(name!, "").replace('.'+ext, "").trim();
         let index = Number(indexStr);
         if (index > maxIndex) {
           maxIndex = index;
         }
      });
      maxIndex++;
    let createName = name + maxIndex + '.' + ext;  
     file.copy(this.createFile_basePath + "/" + template.name, indexPath + "/" + createName).subscribe(s=>{
      this.load();
    }, e=>{
      console.error(e);
    })
  }

  ext_operations: DriverOperationDto[] = [];
  init_sourceManagerOpen() { 
    this.ext_operations=  this.driveEngine.getOperations(this.basePath,true); 
  }
  
  ext_operation_execute(operation: DriverOperationDto) {
    this.driveEngine.execute(operation.driverId,operation.id,this.basePath);
  }


 
}
