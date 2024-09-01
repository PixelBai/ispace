import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-page',
  standalone: true,
  imports: [],
  templateUrl: './property-page.component.html',
  styleUrl: './property-page.component.sass'
})
export class PropertyPageComponent {


  constructor(private route: ActivatedRoute) { }

  folderPath = "";

  ngOnInit(): void {

    // step 1: 获取url参数路径 
    this.route.queryParams.subscribe(queryParams => {
      this.folderPath = queryParams['path'];  
    }); 
 
  
  }

}
