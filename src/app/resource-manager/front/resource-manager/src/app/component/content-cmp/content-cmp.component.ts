import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { MatTableModule } from '@angular/material/table';
import { CoreService } from '../../service/core.service';
import { common, file, fileInfoBaseDto, folder, QueryDto } from 'ispace.core.main';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { PropertiesCmpComponent } from '../properties-cmp/properties-cmp.component';
import { MatDialog } from '@angular/material/dialog';
import {Clipboard} from '@angular/cdk/clipboard';
const ELEMENT_DATA: fileInfoBaseDto[] = [
];

@Component({
  selector: 'app-content-cmp',
  standalone: true,
  imports: [MatTableModule,CdkMenuModule,CommonModule,ClipboardModule],
  templateUrl: './content-cmp.component.html',
  styleUrl: './content-cmp.component.scss'
})
export class ContentCmpComponent {
open(data: fileInfoBaseDto) {
  if(data.isDir) {
    let path = this.coreSvc.path.value.path + "/" + data.name;
    path = path.replace("//", "/");
    this.coreSvc.setPath(path);
    return;
  }
  this.coreSvc.setMsg("打开文件暂不支持");

}
copy(data:fileInfoBaseDto) {
 
  this.clipboard.copy("$ispace copy fileBase "+this.coreSvc.path.value.path + "/" + data.name+" "+(data.isDir?"folder":"file"));
}
shear(data:fileInfoBaseDto) {
  this.clipboard.copy("$ispace shear fileBase "+this.coreSvc.path.value.path + "/" + data.name+" "+(data.isDir?"folder":"file"));
}
rename(data:fileInfoBaseDto) {
   this.coreSvc.setMsg("重命名暂不支持");
}
remove(data:fileInfoBaseDto) {  
  if(data.isDir) {
    folder.remove(this.coreSvc.path.value.path, data.name!).subscribe(s => {
     this.dataSource.filter(s => s.id != data.id);
    }, e => {
      this.coreSvc.setMsg(e.message);
    })
  }
  else {
    file.remove(this.coreSvc.path.value.path, data.name!).subscribe(s => {
      this.dataSource.filter(s => s.id != data.id);
    }, e => {
      this.coreSvc.setMsg(e.message);
    })
  }
}
properties(data:fileInfoBaseDto) {
  this.dialog.open(PropertiesCmpComponent, {
    data: {
      path: this.coreSvc.path.value.path + "/" + data.name,
      type: data.isDir ? "folder" : "file",
    },
  });
 
}
  // id name size mode modTime isDir sys 
  displayedColumns: string[] = ['id', 'name', 'size', 'mode'];
  dataSource = ELEMENT_DATA;
 
  address = ""
  query = ""

  constructor(public coreSvc:CoreService,private clipboard:Clipboard,public dialog: MatDialog) {
     
    coreSvc.path.subscribe(s => {
      if(s.path == this.address) {
        return;
      }

      this.address = s.path;

      this.load(s.path,this.query);
    });

    coreSvc.query.subscribe(s => {
      if(s == this.query) {
        return;
      }

      this.query = s;

      this.load(this.address,s);
    });

    coreSvc.refreshSub.subscribe(s => {
      this.load(this.address,this.query);
    });

  }

  load(path: string, name: string) {
     
    let query = new QueryDto(); 
    query.name = name;
    query.path = path;
    folder.children(query).subscribe({
      next: (s) => {
        this.dataSource = s;
        this.coreSvc.currentFiles.next(s);
        this.coreSvc.setMsg(`已加载 ${s.length} 个文件`);
      }, error: (e: any) => {
        console.error(e);
      }
    })



  }
  




}
