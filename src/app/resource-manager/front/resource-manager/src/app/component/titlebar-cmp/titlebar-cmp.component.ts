import { Component, Input } from '@angular/core'; 
import { FolderDetailsDto } from '../../dto/folderDetailsDto';

@Component({
  selector: 'app-titlebar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './titlebar-cmp.component.html',
  styleUrl: './titlebar-cmp.component.sass'
})
export class TitlebarCmpComponent {

@Input() folder?:FolderDetailsDto 

}
