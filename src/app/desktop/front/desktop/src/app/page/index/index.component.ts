import { Component } from '@angular/core';
import { file, folder } from 'ispace.core.main';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatSlideToggleModule,],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {


  constructor() {

    // 增加一个文件夹
    folder.create( '','test')
    .subscribe({
      next: (s) => {
        console.log(s);
        // 增加一个文件
    file.create('test', 'file.txt').subscribe({
      next: (s) => {
        console.log(s);
      },
      error: (e) => {
        console.log(e);
      }
    }); 
      },
      error: (e) => {
        console.log(e);
      }
    });

     
  }

}
