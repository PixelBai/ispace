import { Component, Input } from '@angular/core';
import { FolderDetailsDto } from '../../dto/folderDetailsDto';

@Component({
  selector: 'app-content-cmp',
  standalone: true,
  imports: [],
  templateUrl: './content-cmp.component.html',
  styleUrl: './content-cmp.component.sass'
})
export class ContentCmpComponent {

  @Input() folder?:FolderDetailsDto 
}
