import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatCardModule} from '@angular/material/card';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { auth } from 'ispace.core.main';
import { TaskbarMenuItemCmpComponent } from "../taskbar-menu-item-cmp/taskbar-menu-item-cmp.component";
import { DynamicDataSource } from './dynamicDataSource';
import { DynamicFlatNode } from './dynamicFlatNode';
import { DynamicDatabase } from './dynamicDatabase';
 
import {MatMenuModule} from '@angular/material/menu';
import { CdkMenuModule } from '@angular/cdk/menu';
@Component({
  selector: 'app-taskbar-menu-cmp',
  standalone: true,
  imports: [MatIconModule, OverlayModule, MatCardModule, MatTreeModule, MatButtonModule, MatProgressBarModule, TaskbarMenuItemCmpComponent,MatMenuModule,CdkMenuModule],
  templateUrl: './taskbar-menu-cmp.component.html',
  styleUrl: './taskbar-menu-cmp.component.sass'
})
export class TaskbarMenuCmpComponent {
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

  constructor(database: DynamicDatabase) {

    // 用户区
    this.userName = auth.getUserInfo().name??"未登录";

    // 列表区
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    database.initialData().then((s) => { 
      this.dataSource.data = s;
    });
  }
 

 
}
