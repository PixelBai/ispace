import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { CoreService } from '../../service/core.service';
import { fileInfoBaseDto } from 'ispace.core.main';

 
interface FolderNode { 
  name: string;
  fileBaseInfo?: fileInfoBaseDto;
  children?: FolderNode[];
}

const TREE_DATA: FolderNode[] = [
  {
    name: '快捷访问',
    children: [],
  },
  {
    name: '全部',
    children: [],
  },
];

@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar-cmp.component.html',
  styleUrl: './sidebar-cmp.component.scss'
})
export class SidebarCmpComponent  {
  treeControl = new NestedTreeControl<FolderNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FolderNode>();

  constructor(public coreSvc:CoreService) {
     this.coreSvc.quickFolders.subscribe(s => { 
      TREE_DATA[0].children = s.map(f => {
        return { 
          name: f.name??"-",
          fileBaseInfo: f
        }
      });  
     });
     this.coreSvc.allFolders.subscribe(s => { 
      TREE_DATA[1].children = s.map(f => {
        return { 
          name: f.name??"-",
          fileBaseInfo: f
        }
      });  
     });
     this.dataSource.data = TREE_DATA;
  }

  ngAfterViewInit(): void {
    this.treeControl.dataNodes = TREE_DATA;
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FolderNode) => !!node.children && node.children.length > 0;
}
