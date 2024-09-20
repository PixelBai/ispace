import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { auth, file, fileInfoBaseDto, folder, QueryDto } from 'ispace.core.main';
import { CoreService } from '../../service/core.service'; 
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { PropertiesCmpComponent } from '../properties-cmp/properties-cmp.component';

@Component({
  selector: 'app-menubar-cmp',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './menubar-cmp.component.html',
  styleUrl: './menubar-cmp.component.scss'
})
export class MenubarCmpComponent {

  logout() {
    auth.logout();
    window.location.reload();
  }

  @Input() folder?: FolderDetailsDto

  constructor(private coreSvc: CoreService, public dialog: MatDialog) { 
    this.load_templates();
  }

  createFolder() {
    let maxIndex = 0;
    this.coreSvc.currentFiles.value.filter(s => s.isDir && s.name!.startsWith("新建文件夹"))
      .forEach(s => {
        let indexStr = s.name!.replace("新建文件夹", "").trim();
        let index = Number(indexStr);
        if (index > maxIndex) {
          maxIndex = index;
        }
      });
    maxIndex++;
    let folderName = "新建文件夹" + maxIndex;
    folder.create(this.coreSvc.path.value.path, folderName).subscribe(s => {
      this.refresh();
    }, e => {
      console.error(e);
    })
  }


  refresh() {
    this.coreSvc.refresh();
  }




  /*** 新建文件 ***/
  createFile_basePath = "/Desktop/.ispace/new_decument_template";
  createFile_templates: fileInfoBaseDto[] = [];

  load_templates() {
    if (this.createFile_templates.length > 0) {
      this.createFile_templates = [];
    }
    let query = new QueryDto();
    query.path = this.createFile_basePath;
    folder.children(query).subscribe(s => {
      this.createFile_templates = s.filter(s => !s.isDir);
    })
  }

  createFile(template: fileInfoBaseDto) {

    // 名称 和 后缀
    let data = template.name!.split(".");
    let name = data[0];
    let ext = data[1];

    let maxIndex = 0;
    this.coreSvc.currentFiles.value.filter(s => !s.isDir && s.name!.endsWith('.' + ext) && s.name!.startsWith(name))
      .forEach(s => {
        let indexStr = s.name!.replace(name!, "").replace('.' + ext, "").trim();
        let index = Number(indexStr);
        if (index > maxIndex) {
          maxIndex = index;
        }
      });
    maxIndex++;
    let createName = name + maxIndex + '.' + ext;
    file.copy(this.createFile_basePath + "/" + template.name, this.coreSvc.path.value.path + "/" + createName).subscribe(s => {
      this.refresh();
    }, e => {
      console.error(e);
    })
  }

  properties() {
    this.dialog.open(PropertiesCmpComponent, {
      data: {
        path: this.coreSvc.path.value.path,
      },
    });
  }

  isCanPaste = false;

  operateMenu(event: MouseEvent) {
    this.isCanPaste = false;
    navigator.clipboard.readText().then(s => {
      this.isCanPaste = s.startsWith("$ispace copy fileBase ") || s.startsWith("$ispace shear fileBase ");
    })
  }

  paste() {
    navigator.clipboard.readText().then(s => {
      let info = s.split(" ");
      let path = info[3]
      let fileType = info[4];
      let type = info[2];

      if (fileType == "file") {
        if (type == "copy") {
          file.copy(path, this.coreSvc.path.value.path).subscribe(s => {
            this.refresh();
          }, e => {
            this.coreSvc.setMsg(e.message);
          });
        }
        if (type == "shear") {
          this.coreSvc.setMsg("剪切文件暂不支持");
        }
      }

      if (fileType == "folder") {
        this.coreSvc.setMsg("复制-剪切文件夹暂不支持");
      }

    });
  }


}
