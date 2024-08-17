import { Component } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    // step 1: 获取url参数路径 
    this.route.queryParams.subscribe(queryParams => {
      const folderPath = queryParams['path'];  
      alert(folderPath);
    }); 
 
  
  }


}
