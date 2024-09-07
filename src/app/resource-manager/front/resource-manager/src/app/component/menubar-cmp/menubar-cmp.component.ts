import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';

@Component({
  selector: 'app-menubar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './menubar-cmp.component.html',
  styleUrl: './menubar-cmp.component.sass'
})
export class MenubarCmpComponent {

  @Input() folder?:FolderDetailsDto 
}
