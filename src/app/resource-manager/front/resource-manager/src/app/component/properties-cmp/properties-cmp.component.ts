import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { file, fileInfoBaseDto } from 'ispace.core.main';

@Component({
  selector: 'app-properties-cmp',
  standalone: true,
  imports: [],
  templateUrl: './properties-cmp.component.html',
  styleUrl: './properties-cmp.component.scss'
})
export class PropertiesCmpComponent {

  fileBaseInfo!:fileInfoBaseDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
     file.statf(this.data.path).subscribe(s => {
        this.fileBaseInfo = s;
     }) 
  }
}
