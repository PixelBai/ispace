import { DataSource, CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { BehaviorSubject, Observable, merge, map } from "rxjs";
import { DynamicFlatNode } from "./dynamicFlatNode"; 
import { DynamicDatabase } from "./dynamicDatabase";
 
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  
    get data(): DynamicFlatNode[] {
      return this.dataChange.value;
    }
    set data(value: DynamicFlatNode[]) {
      this._treeControl.dataNodes = value;
      this.dataChange.next(value);
    }
  
    constructor(
      private _treeControl: FlatTreeControl<DynamicFlatNode>,
      private _database: DynamicDatabase,
    ) {}
  
    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
      this._treeControl.expansionModel.changed.subscribe(change => {
        if (
          (change as SelectionChange<DynamicFlatNode>).added ||
          (change as SelectionChange<DynamicFlatNode>).removed
        ) {
          this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
        }
      });
  
      return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }
  
    disconnect(collectionViewer: CollectionViewer): void {}
  
    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
      if (change.added) {
        change.added.forEach(node => this.toggleNode(node, true));
      }
      if (change.removed) {
        change.removed
          .slice()
          .reverse()
          .forEach(node => this.toggleNode(node, false));
      }
    }
  
    /**
     * Toggle the node, remove from display list
     */
    toggleNode(node: DynamicFlatNode, expand: boolean) {
       this._database.loadChildren(node).then((nodes) => {
        const index = this.data.indexOf(node);
        if (!nodes || index < 0) {
        // If no children, or cannot find the node, no op
        return;
        }
      node.isLoading = true;

      // 子项重新加载
      // 子项清空
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}
      if (count > 0) {
      this.data.splice(index + 1, count);
      }
      // 子项加载
      if (expand) { 
        this.data.splice(index + 1, 0, ...nodes);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;

      });  
    }
  }
  