import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

 
interface FolderNode {
  name: string;
  children?: FolderNode[];
}

const TREE_DATA: FolderNode[] = [
  {
    name: '快捷访问',
    children: [{name: 'Desktop'}, {name: 'Video'}, {name: 'Image'}],
  },
  {
    name: '全部',
    children: [
      {
        name: 'data', 
      },
      {
        name: 'ispace', 
      },
    ],
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

  constructor() { 
    this.dataSource.data = TREE_DATA;
  } 

  ngAfterViewInit(): void { 
 
    this.treeControl.dataNodes = TREE_DATA;
    this.treeControl.expandAll();
  }

  hasChild = (_: number, node: FolderNode) => !!node.children && node.children.length > 0;
}
