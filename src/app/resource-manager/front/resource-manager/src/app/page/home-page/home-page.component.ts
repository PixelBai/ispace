import { Component } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { SidebarCmpComponent } from "../../component/sidebar-cmp/sidebar-cmp.component";
import { ContentCmpComponent } from "../../component/content-cmp/content-cmp.component";
import { MenubarCmpComponent } from "../../component/menubar-cmp/menubar-cmp.component";
import { ToolbarCmpComponent } from "../../component/toolbar-cmp/toolbar-cmp.component";
import { TitlebarCmpComponent } from "../../component/titlebar-cmp/titlebar-cmp.component";
import { InfobarCmpComponent } from "../../component/infobar-cmp/infobar-cmp.component";
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import { folder } from 'ispace.core.main';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SidebarCmpComponent, ContentCmpComponent, MenubarCmpComponent, ToolbarCmpComponent, TitlebarCmpComponent, InfobarCmpComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private route: ActivatedRoute) { }

  folderData?:FolderDetailsDto; 
  folderPath = "";

  ngOnInit(): void {

    // step 1: 获取url参数路径 
    this.route.queryParams.subscribe(queryParams => {
      this.folderPath = queryParams['path'];  

      // step 2: 获取文件夹详情 
      this.setCurrentFolder(this.folderPath);
    }); 
  
  }

  setCurrentFolder(path:string) {
    
    // step 1: 获取文件夹信息
    folder.statf(path).subscribe({
      next: (s) => {
        this.folderData = s;
        this.folderPath = path;
      }, error: (e: any) => {
        console.log(e);
      }
    }); 
    
  }


}
