import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { MatTableModule } from '@angular/material/table';
import { CoreService } from '../../service/core.service';
import { fileInfoBaseDto, folder } from 'ispace.core.main';

const ELEMENT_DATA: fileInfoBaseDto[] = [
];

@Component({
  selector: 'app-content-cmp',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './content-cmp.component.html',
  styleUrl: './content-cmp.component.scss'
})
export class ContentCmpComponent {
  // id name size mode modTime isDir sys 
  displayedColumns: string[] = ['id', 'name', 'size', 'mode'];
  dataSource = ELEMENT_DATA;
 
  address = ""
  query = ""

  constructor(public coreSvc:CoreService) { 
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

  load(path: string, query: string) {
     
      // 根据路径和查询条件加载数据
      // --需要core 添加查询条件参数
      
    folder.children(path).subscribe({
      next: (s) => {
        this.dataSource = s;
      }, error: (e: any) => {
        console.error(e);
      }
    })



  }
  




}
