import { Component, Input } from '@angular/core'; 
import { FolderDetailsDto } from '../../dto/folderDetailsDto';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-titlebar-cmp',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './titlebar-cmp.component.html',
  styleUrl: './titlebar-cmp.component.sass'
})
export class TitlebarCmpComponent {

  @Input() folderData?:FolderDetailsDto 

  
}
