import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { CoreService } from '../../service/core.service';
import { fileInfoBaseDto } from 'ispace.core.main';
import { of } from 'rxjs';
import { nodeModuleNameResolver } from 'typescript';

interface FoodNode {
  name: string;
  fileBaseInfo?: fileInfoBaseDto;
  path: string;
  children?: FoodNode[];
}



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  path: string;
  level: number;
}

@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar-cmp.component.html',
  styleUrl: './sidebar-cmp.component.scss'
})
export class SidebarCmpComponent {
open(node: FoodNode) {  
  this.coreSvc.setPath(node.path!);
}

  TREE_DATA: FoodNode[] = [
    {
      name: '快捷访问',
      path: "/",
      children: [],
    },
    {
      name: '全部',
      path: "/",
      children: [
      ],
    },
  ];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      path: node.path,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable, 
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable, 
    node => node.children, 
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private coreSvc: CoreService) {
    this.coreSvc.quickFolders.subscribe(s => {
      this.TREE_DATA[0].children = s.map(f => {
        return {
          name: f.name ?? "-",
          fileBaseInfo: f,
          path: "/",
          children: [],
        }
      });
      this.dataSource.data = this.TREE_DATA;
      this.treeControl.expandAll();
    });
    this.coreSvc.allFolders.subscribe(s => {
      this.TREE_DATA[1].children = s.filter(f => f.isDir).map(f => {
        return {
          name: f.name ?? "-",
          fileBaseInfo: f,
          path: "/"+f.name!,
          children: [],
        }
      });

      this.dataSource.data = this.TREE_DATA 
      this.treeControl.expandAll();
    });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable; 

}
