import { Component } from '@angular/core';
import { ToolbarCmpComponent } from "../../component/toolbar-cmp/toolbar-cmp.component";
import { EditorCmpComponent } from "../../component/editor-cmp/editor-cmp.component";
import { StatusbarCmpComponent } from "../../component/statusbar-cmp/statusbar-cmp.component"; 
import { urlUtil } from '../../util/urlUtil';
import { FileSvcService } from '../../svc/file-svc.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ToolbarCmpComponent, EditorCmpComponent, StatusbarCmpComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent {

  constructor(public fileSvc:FileSvcService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    // step 1: 获取url参数路径 
    this.route.queryParams.subscribe(queryParams => {
      const filePath = queryParams['path']; 
      // step 2: 初始化filesvc
      this.fileSvc.init(filePath);
    }); 
 
  
  }


}
