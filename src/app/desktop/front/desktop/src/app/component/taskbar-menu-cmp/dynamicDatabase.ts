import { Injectable } from "@angular/core";
import { DynamicFlatNode } from "./dynamicFlatNode";
import { TaskbarMenuItemDto } from "../taskbar-menu-item-cmp/taskbar-menu-item-dto";
import { folder, QueryDto } from "ispace.core.main";
import { fileInfoBaseDto } from "ispace.core.main";

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
    

  basePath = "Desktop/.ispace"
  menuPath = "/.ispace/menu"

 // action : loadChildren(parentNodes)
    loadChildren(parentNode: DynamicFlatNode): Promise<DynamicFlatNode[]> {
        return new Promise<DynamicFlatNode[]>((resolve) => { 
            let query = new QueryDto();
            query.path = parentNode.item.path;
            folder.children(query).subscribe(
                (s) => {
                    let nodes = s.map(
                        d =>{
                            return this.convertTaskbarMenuItemDto(parentNode.item.path,d,parentNode.level); 
                        }
                    );
                    resolve(nodes);
                },
                (e) => {
                    console.log(e);
                    resolve([]);
                }
            )
        })
        
    } 
    
  /** Initial data from database */
  initialData(): Promise<DynamicFlatNode[]> {

    return new Promise<DynamicFlatNode[]>((resolve) => {
          // step init:
    let data = new fileInfoBaseDto();
    data.id = '0';
    data.isDir = true;
    data.name = "menu";  
    let topNode = this.convertTaskbarMenuItemDto(this.basePath,data,0);

    // step 1: 获取根节点下的子项
    this.loadChildren(topNode).then((s) => { 
      resolve(s);
    });
    });
  } 

convertTaskbarMenuItemDto(parentPath:string,d: fileInfoBaseDto,parentLevel:number):DynamicFlatNode{ 
    let data = new TaskbarMenuItemDto(); 
    data.type = d.isDir ? "folder" : "file";
    data.path = parentPath + "/"+d.name;
    data.id = d.id!;
    data.iconUrl = d.isDir ? "images/folder.png" : "images/unknow.png";
    data.desc = this.formatInfo(d);
    data.name = d.name?? (d.isDir ? "未命名文件夹" : "未命名文件");
    data.data = d;
    return new DynamicFlatNode(data, parentLevel + 1, d.isDir);
}

 formatInfo(info:fileInfoBaseDto):string{
    let result = "";
    result += "名称：" + info.name;
    result += "\n大小：" + info.size;
    result += "\n修改时间：" + info.modTime;
    return result;
  }
 
}